import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, FanStory, Profile, StoryComment } from '../lib/supabase';
import { ArrowLeft, Heart, MessageCircle, Send } from 'lucide-react';

type StoryReaderProps = {
  story: FanStory;
  onBack: () => void;
};

export default function StoryReader({ story, onBack }: StoryReaderProps) {
  const { user, profile } = useAuth();
  const [author, setAuthor] = useState<Profile | null>(null);
  const [comments, setComments] = useState<(StoryComment & { author: Profile })[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStoryData();
  }, []);

  const loadStoryData = async () => {
    try {
      const { data: authorData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', story.author_id)
        .single();
      setAuthor(authorData);

      const { data: commentsData } = await supabase
        .from('story_comments')
        .select('*, author:profiles(*)')
        .eq('story_id', story.id)
        .order('created_at', { ascending: false });

      setComments(commentsData || []);

      const { data: likes } = await supabase
        .from('story_likes')
        .select('*')
        .eq('story_id', story.id);

      setLikeCount(likes?.length ?? 0);

      if (user && likes) {
        setIsLiked(likes.some(like => like.user_id === user.id));
      }
    } catch (err) {
      console.error('Failed to load story data:', err);
    }
  };

  const toggleLike = async () => {
    if (!user) return;

    try {
      if (isLiked) {
        await supabase
          .from('story_likes')
          .delete()
          .eq('story_id', story.id)
          .eq('user_id', user.id);
        setLikeCount(Math.max(0, likeCount - 1));
      } else {
        await supabase
          .from('story_likes')
          .insert({ story_id: story.id, user_id: user.id });
        setLikeCount(likeCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !commentText.trim()) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('story_comments')
        .insert({
          story_id: story.id,
          author_id: user.id,
          content: commentText
        })
        .select('*, author:profiles(*)');

      if (error) throw error;

      if (data && data.length > 0) {
        setComments([data[0], ...comments]);
      }
      setCommentText('');
    } catch (err) {
      console.error('Failed to post comment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Stories
      </button>

      <div className="bg-slate-800 border border-gray-700 rounded-xl p-8">
        <div className="mb-8 pb-8 border-b border-gray-700">
          <p className="text-amber-400 text-sm font-semibold uppercase tracking-wide mb-2">{story.category}</p>
          <h1 className="text-4xl font-bold text-white mb-4">{story.title}</h1>

          {author && (
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center text-white font-bold">
                {author.display_name?.[0] || author.username[0]}
              </div>
              <div>
                <p className="text-white font-semibold">{author.display_name || author.username}</p>
                <p className="text-gray-400 text-sm">@{author.username}</p>
              </div>
            </div>
          )}

          {story.description && (
            <p className="text-gray-300 text-lg mb-6">{story.description}</p>
          )}

          <div className="flex items-center gap-6">
            <button
              onClick={toggleLike}
              className="flex items-center gap-2 text-gray-400 hover:text-rose-400 transition-colors"
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>{likeCount}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-400">
              <MessageCircle className="w-5 h-5" />
              <span>{comments.length}</span>
            </div>
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-12">
          <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-base">
            {story.content}
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <h2 className="text-2xl font-bold text-white mb-6">Comments</h2>

          {user && (
            <form onSubmit={submitComment} className="mb-8">
              <div className="flex gap-4">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Share your thoughts..."
                  className="flex-1 px-4 py-2 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={loading || !commentText.trim()}
                  className="px-6 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Post
                </button>
              </div>
            </form>
          )}

          {comments.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-slate-700/50 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-rose-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {comment.author.display_name?.[0] || comment.author.username[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{comment.author.display_name || comment.author.username}</p>
                      <p className="text-gray-400 text-xs">@{comment.author.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-300">{comment.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
