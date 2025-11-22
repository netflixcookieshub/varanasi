import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import StoryGallery from './StoryGallery';
import DiscussionChat from './DiscussionChat';
import StoryUpload from './StoryUpload';
import { BookOpen, MessageCircle, LogOut } from 'lucide-react';

export default function CommunityHub() {
  const { user, profile, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'stories' | 'chat'>('stories');
  const [showUpload, setShowUpload] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  if (!user) {
    return <AuthModal open={!user} onOpenChange={setShowAuthModal} />;
  }

  return (
    <section className="min-h-screen bg-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent">
              Rudhra Community
            </h1>
            <p className="text-gray-400 mt-2">Share your stories. Join the discussion.</p>
          </div>

          <div className="flex items-center gap-4">
            {profile && (
              <div className="text-right">
                <p className="text-white font-medium">{profile.display_name || profile.username}</p>
                <p className="text-gray-500 text-sm">@{profile.username}</p>
              </div>
            )}
            <button
              onClick={() => signOut()}
              className="p-2 rounded-lg hover:bg-slate-900 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-b from-slate-900 to-slate-800 border border-gray-700 rounded-2xl overflow-hidden">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => {
                setActiveTab('stories');
                setShowUpload(false);
              }}
              className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'stories'
                  ? 'bg-amber-500/20 text-amber-400 border-b-2 border-amber-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Fan Stories
            </button>
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-4 px-6 font-semibold flex items-center justify-center gap-2 transition-colors ${
                activeTab === 'chat'
                  ? 'bg-rose-500/20 text-rose-400 border-b-2 border-rose-400'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              Discussion
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'stories' && (
              <div>
                <button
                  onClick={() => setShowUpload(!showUpload)}
                  className="mb-8 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-colors"
                >
                  {showUpload ? 'Cancel' : '+ Upload Your Story'}
                </button>

                {showUpload && <StoryUpload onComplete={() => setShowUpload(false)} />}
                <StoryGallery />
              </div>
            )}

            {activeTab === 'chat' && <DiscussionChat />}
          </div>
        </div>
      </div>
    </section>
  );
}
