import { Swords, Heart, Skull } from 'lucide-react';

const characters = [
  {
    name: 'RUDHRA',
    title: 'The Eternal Protector',
    icon: Swords,
    color: 'amber',
    description: 'A samskara anchor whose consciousness spans multiple timelines. He doesn\'t remember his previous lives, but his body remembers.',
    incarnations: [
      { era: '512 CE', role: 'Young warrior defending Varanasi' },
      { era: '1200s', role: 'Monk scholar seeking truth' },
      { era: '1800s', role: 'Rebel freedom fighter' },
      { era: '2025', role: 'Lost teenager discovering identity' },
      { era: '2071', role: 'Elder sage understanding the cycle' }
    ]
  },
  {
    name: 'MANDAKINI',
    title: 'The Goddess Trapped',
    icon: Heart,
    color: 'rose',
    description: 'Cursed to remember all past lives while Rudhra forgets. Every confession of love resets his memory. This has happened for 1500 years.',
    incarnations: [
      { era: '512 CE', role: 'Queen and priestess of Varanasi' },
      { era: '1200s', role: 'Mystic in the forest' },
      { era: '1800s', role: 'Mysterious freedom fighter' },
      { era: '2025', role: 'Girl who feels strangely familiar' },
      { era: '2071', role: 'The only one who remembers everything' }
    ]
  },
  {
    name: 'KUMBHA',
    title: 'The Eternal Antagonist',
    icon: Skull,
    color: 'red',
    description: 'An ancient demon who refuses to die. Believes reincarnation is a prison and seeks to destroy all samskara fragments to end the cycle.',
    incarnations: [
      { era: '512 CE', role: 'Asura warlord conquering cities' },
      { era: '1200s', role: 'Corrupt priest selling salvation' },
      { era: '1800s', role: 'British oppressor' },
      { era: '2025', role: 'Tech CEO harvesting consciousness' },
      { era: '2071', role: 'Corrupt AI ending reincarnation' }
    ]
  }
];

export default function Characters() {
  return (
    <section className="relative py-24 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-amber-400 text-sm font-semibold tracking-wider">MAIN CHARACTERS</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
            Three Souls, Infinite Lives
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
        </div>

        <div className="space-y-12">
          {characters.map((character, idx) => {
            const Icon = character.icon;
            const colorClasses = {
              amber: 'from-amber-600/20 to-amber-900/20 border-amber-500/30 text-amber-400',
              rose: 'from-rose-600/20 to-rose-900/20 border-rose-500/30 text-rose-400',
              red: 'from-red-600/20 to-red-900/20 border-red-500/30 text-red-400'
            };

            return (
              <div
                key={idx}
                className={`bg-gradient-to-br ${colorClasses[character.color as keyof typeof colorClasses].split(' ')[0]} ${colorClasses[character.color as keyof typeof colorClasses].split(' ')[1]} border rounded-2xl p-8 hover:scale-[1.02] transition-transform duration-300`}
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl bg-black/40 ${colorClasses[character.color as keyof typeof colorClasses].split(' ')[2]}`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white">{character.name}</h3>
                        <p className={`text-sm ${colorClasses[character.color as keyof typeof colorClasses].split(' ')[2]}`}>
                          {character.title}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">
                      {character.description}
                    </p>
                  </div>

                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold text-white mb-4">Incarnations Across Time</h4>
                    <div className="space-y-3">
                      {character.incarnations.map((inc, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 bg-black/40 rounded-lg p-3 hover:bg-black/60 transition-colors"
                        >
                          <span className={`text-xs font-bold ${colorClasses[character.color as keyof typeof colorClasses].split(' ')[2]} min-w-[60px]`}>
                            {inc.era}
                          </span>
                          <span className="text-gray-300 text-sm">{inc.role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
