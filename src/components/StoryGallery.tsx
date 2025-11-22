import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, FanStory, Profile, StoryLike } from '../lib/supabase';
import { Heart, MessageCircle, Eye, Trash2 } from 'lucide-react';
import StoryReader from './StoryReader';

export default function StoryGallery() {
  const { user } = useAuth();
  const [stories, setStories] = useState<(FanStory & { author: Profile; likeCount: number; isLiked: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState<FanStory | null>(null);

  useEffect(() => {
    loadStories();

    const subscription = supabase
      .channel('fan_stories')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'fan_stories' }, () => {
        loadStories();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadStories = async () => {
    try {
      const { data, error } = await supabase
        .from('fan_stories')
        .select('*, author:profiles(*)')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const storiesWithLikes = await Promise.all(
        (data || []).map(async (story) => {
          const { data: likes } = await supabase
            .from('story_likes')
            .select('*')
            .eq('story_id', story.id);

          const isLiked = user
            ? likes?.some(like => like.user_id === user.id) ?? false
            : false;

          return {
            ...story,
            likeCount: likes?.length ?? 0,
            isLiked
          };
        })
      );

      setStories(storiesWithLikes);
    } catch (err) {
      console.error('Failed to load stories:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (storyId: string) => {
    if (!user) return;

    try {
      const story = stories.find(s => s.id === storyId);
      if (!story) return;

      if (story.isLiked) {
        await supabase
          .from('story_likes')
          .delete()
          .eq('story_id', storyId)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('story_likes')
          .insert({ story_id: storyId, user_id: user.id });
      }

      loadStories();
    } catch (err) {
      console.error('Failed to toggle like:', err);
    }
  };

  const deleteStory = async (storyId: string) => {
    if (!user) return;

    try {
      await supabase
        .from('fan_stories')
        .delete()
        .eq('id', storyId)
        .eq('author_id', user.id);

      loadStories();
    } catch (err) {
      console.error('Failed to delete story:', err);
    }
  };

  if (loading) {
    return <div className="text-center py-12 text-gray-400">Loading stories...</div>;
  }

  if (selectedStory) {
    return <StoryReader story={selectedStory} onBack={() => setSelectedStory(null)} />;
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No stories yet. Be the first to share your Rudhra tale!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <div
          key={story.id}
          className="bg-slate-800 border border-gray-700 rounded-lg overflow-hidden hover:border-amber-500/50 transition-colors group"
        >
          <div className="aspect-video bg-gradient-to-br from-amber-900 to-slate-900 flex items-center justify-center p-4 cursor-pointer group-hover:from-amber-800 transition-colors" onClick={() => setSelectedStory(story)}>
            <div className="text-center">
              <p className="text-amber-300 font-semibold text-sm uppercase tracking-wide">{story.category}</p>
              <h3 className="text-white font-bold mt-2 line-clamp-2">{story.title}</h3>
            </div>
          </div>

          <div className="p-4">
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{story.description}</p>

            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full bg-amber-600" />
              <div>
                <p className="text-white font-medium text-sm">{story.author.display_name || story.author.username}</p>
                <p className="text-gray-500 text-xs">@{story.author.username}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <button
                onClick={() => toggleLike(story.id)}
                className="flex items-center gap-1 text-gray-400 hover:text-rose-400 transition-colors"
              >
                <Heart className={`w-4 h-4 ${story.isLiked ? 'fill-rose-400 text-rose-400' : ''}`} />
                <span className="text-xs">{story.likeCount}</span>
              </button>

              <button
                onClick={() => setSelectedStory(story)}
                className="flex items-center gap-1 text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span className="text-xs">{story.view_count}</span>
              </button>

              {user?.id === story.author_id && (
                <button
                  onClick={() => deleteStory(story.id)}
                  className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
