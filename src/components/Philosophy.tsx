import { Infinity, Lightbulb } from 'lucide-react';

const themes = [
  {
    title: 'Reincarnation as Truth',
    description: 'Not mythology, but quantum physics of consciousness across timelines',
    icon: '🔄'
  },
  {
    title: 'Love Stronger Than Death',
    description: 'Some loves are too important to exist only once',
    icon: '❤️'
  },
  {
    title: 'Choice vs. Destiny',
    description: 'The cycle continues, but acceptance transforms curse into gift',
    icon: '⚖️'
  },
  {
    title: 'Connection Across Time',
    description: 'We\'ve all been each other across infinite lifetimes',
    icon: '🌐'
  }
];

export default function Philosophy() {
  return (
    <section className="relative py-24 px-4 bg-black overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(251, 191, 36, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(244, 63, 94, 0.3) 0%, transparent 50%)',
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold tracking-wider">CORE THEMES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Philosophy & Meaning
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {themes.map((theme, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/40 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4">{theme.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{theme.title}</h3>
              <p className="text-gray-400">{theme.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-amber-950/50 via-rose-950/50 to-red-950/50 border border-amber-500/30 rounded-2xl p-8 md:p-12 text-center">
          <Infinity className="w-16 h-16 text-amber-400 mx-auto mb-6" />
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
            The Final Message
          </h3>
          <blockquote className="text-xl md:text-2xl text-gray-300 italic font-light leading-relaxed mb-8">
            "This is not a story about escaping time. It's about understanding that time is not linear—it's a river that flows in all directions at once. Love is the current that moves that river. And consciousness is the drop of water that remembers being many rivers."
          </blockquote>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto mb-8" />
          <p className="text-2xl text-amber-300 font-medium">
            "Reincarnation is not a trap. It's the universe's way of saying:
            <br className="hidden md:block" />
            Some loves are too important to exist only once."
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-slate-900 border border-gray-700 rounded-xl p-6">
            <h4 className="text-4xl font-bold text-amber-400 mb-2">24</h4>
            <p className="text-gray-400">Episodes</p>
          </div>
          <div className="bg-slate-900 border border-gray-700 rounded-xl p-6">
            <h4 className="text-4xl font-bold text-rose-400 mb-2">1500</h4>
            <p className="text-gray-400">Years of Love</p>
          </div>
          <div className="bg-slate-900 border border-gray-700 rounded-xl p-6">
            <h4 className="text-4xl font-bold text-red-400 mb-2">∞</h4>
            <p className="text-gray-400">Timelines</p>
          </div>
        </div>
      </div>
    </section>
  );
}
