import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Hero from './components/Hero';
import Story from './components/Story';
import Characters from './components/Characters';
import Timeline from './components/Timeline';
import Philosophy from './components/Philosophy';
import Footer from './components/Footer';
import CommunityHub from './components/CommunityHub';
import { Flame } from 'lucide-react';

function App() {
  const [showCommunity, setShowCommunity] = useState(false);

  return (
    <AuthProvider>
      {!showCommunity ? (
        <div className="min-h-screen bg-black text-white">
          <div className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-amber-500/20">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-amber-400" />
                <span className="font-bold text-lg">RUDHRA</span>
              </div>
              <button
                onClick={() => setShowCommunity(true)}
                className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-colors"
              >
                Fan Community
              </button>
            </div>
          </div>

          <Hero />
          <Story />
          <Characters />
          <Timeline />
          <Philosophy />
          <Footer />
        </div>
      ) : (
        <div className="min-h-screen bg-black text-white">
          <div className="sticky top-0 z-40 bg-black/90 backdrop-blur border-b border-amber-500/20">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Flame className="w-6 h-6 text-amber-400" />
                <span className="font-bold text-lg">RUDHRA</span>
              </div>
              <button
                onClick={() => setShowCommunity(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
              >
                Back to Story
              </button>
            </div>
          </div>

          <CommunityHub />
        </div>
      )}
    </AuthProvider>
  );
}

export default App;
