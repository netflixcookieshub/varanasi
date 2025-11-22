import { Film, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-black to-slate-950 py-12 px-4 border-t border-amber-500/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Film className="w-6 h-6 text-amber-400" />
            <h3 className="text-2xl font-bold text-white">Connection to Rajamouli's Universe</h3>
          </div>
          <p className="text-gray-400 max-w-3xl mx-auto">
            This anime concept serves as a spiritual companion to SS Rajamouli's upcoming Varanasi film,
            exploring the mythology and philosophy in deeper detail while maintaining the epic,
            visual grandeur the director is known for.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-amber-500/20 rounded-lg p-6 text-center">
            <Zap className="w-8 h-8 text-amber-400 mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Same Characters</h4>
            <p className="text-gray-400 text-sm">Rudhra, Mandakini, and Kumbha from the film</p>
          </div>

          <div className="bg-slate-900 border border-amber-500/20 rounded-lg p-6 text-center">
            <Zap className="w-8 h-8 text-rose-400 mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Time Span</h4>
            <p className="text-gray-400 text-sm">512 CE to 2071, as hinted in the teaser</p>
          </div>

          <div className="bg-slate-900 border border-amber-500/20 rounded-lg p-6 text-center">
            <Zap className="w-8 h-8 text-red-400 mx-auto mb-3" />
            <h4 className="text-white font-semibold mb-2">Hindu Mythology</h4>
            <p className="text-gray-400 text-sm">Ramayana elements and cosmic significance</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-rose-400 bg-clip-text text-transparent mb-1">
                RUDHRA: ETERNAL GUARDIAN
              </h2>
              <p className="text-gray-500 text-sm">Anime Story Concept</p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                A journey through time, reincarnation, and eternal love
              </p>
              <p className="text-gray-600 text-xs mt-1">
                Connected to SS Rajamouli's "Varanasi" Universe
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
