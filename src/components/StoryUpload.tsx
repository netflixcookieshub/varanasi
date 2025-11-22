import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';

type StoryUploadProps = {
  onComplete: () => void;
};

export default function StoryUpload({ onComplete }: StoryUploadProps) {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError('');
    setLoading(true);

    try {
      if (!title.trim() || !content.trim()) {
        throw new Error('Title and content are required');
      }

      const { error: insertError } = await supabase
        .from('fan_stories')
        .insert({
          author_id: user.id,
          title,
          description,
          content,
          category
        });

      if (insertError) throw insertError;

      setSuccess(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload story');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Story Uploaded!</h3>
          <p className="text-gray-400">Your story is now live in the community.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-8 bg-slate-800/50 border border-gray-700 rounded-xl p-6">
      {error && (
        <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/50 flex items-start gap-2">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Story Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500"
          placeholder="e.g., The Lost Memory of Rudhra"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 resize-none h-20"
          placeholder="Brief summary of your story..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 bg-slate-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-amber-500"
        >
          <option value="general">General</option>
          <option value="action">Action</option>
          <option value="romance">Romance</option>
          <option value="mystery">Mystery</option>
          <option value="timeskip">Time Skip</option>
          <option value="alternate-universe">Alternate Universe</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Story Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-4 py-3 bg-slate-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 resize-none h-48 font-mono text-sm"
          placeholder="Write your fan fiction story here..."
          required
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Upload className="w-5 h-5" />
          {loading ? 'Uploading...' : 'Publish Story'}
        </button>
      </div>
    </form>
  );
}
