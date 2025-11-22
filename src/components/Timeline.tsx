import { Clock } from 'lucide-react';

const arcs = [
  {
    title: 'ARC 1: THE FRAGMENTS',
    episodes: 'Episodes 1-6',
    setting: 'Modern Day (2025)',
    color: 'bg-blue-500',
    summary: 'Rudhra discovers his identity as the eternal protector and begins collecting samskara fragments before Kumbha can destroy them.',
    keyMoments: [
      'Rudhra finds the ancient trident',
      'Meets Mandakini who remembers everything',
      'First fragment reveals memories of 512 CE',
      'Race across global cities for fragments',
      'Discovery of the Origin Fragment in Antarctica'
    ]
  },
  {
    title: 'ARC 2: THE TIMELINES',
    episodes: 'Episodes 7-12',
    setting: 'Jumping Through Eras',
    color: 'bg-amber-500',
    summary: 'Using fragments, Rudhra travels through different timelines—ancient Varanasi, medieval monasteries, colonial battlefields, and a dystopian future.',
    keyMoments: [
      'Young warrior in 512 CE fighting demons',
      'Monk in 1200s understanding the cycle',
      'Freedom fighter in 1820s against oppression',
      'Pattern revealed: Every sacrifice creates a fragment',
      'Future 2071: Humanity merging with AI'
    ]
  },
  {
    title: 'ARC 3: THE CHOICE',
    episodes: 'Episodes 13-18',
    setting: 'Antarctica Convergence',
    color: 'bg-purple-500',
    summary: 'All timelines converge. Rudhra must decide: break the cycle and lose Mandakini\'s memories, or accept eternity together.',
    keyMoments: [
      'Philosophical debate on suffering vs. love',
      'Origin Fragment shows they created the cycle',
      'Kumbha\'s transformation and alliance',
      'Decision to balance fragments, not destroy them',
      'Ancient ritual distributes samskara to all souls'
    ]
  },
  {
    title: 'ARC 4: THE ETERNITY',
    episodes: 'Episodes 19-24',
    setting: 'Present & Beyond',
    color: 'bg-rose-500',
    summary: 'The cycle continues as a choice, not a trap. Humanity gains access to past-life memories. True love transcends all timelines.',
    keyMoments: [
      'Peaceful present with transformed Kumbha',
      'World changes as people remember past lives',
      'Rudhra discovers he IS the fragment',
      'Acceptance of eternal role as consciousness anchor',
      'Final scene: Walking into the Ganges across all time'
    ]
  }
];

export default function Timeline() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold tracking-wider">24 EPISODES</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Story Structure
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500 via-purple-500 to-rose-500" />

          <div className="space-y-16">
            {arcs.map((arc, idx) => (
              <div
                key={idx}
                className={`relative ${idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'} pl-12 md:pl-0`}
              >
                <div className={`absolute left-4 md:left-1/2 w-8 h-8 rounded-full ${arc.color} transform -translate-x-1/2 flex items-center justify-center border-4 border-black z-10`}>
                  <span className="text-white text-xs font-bold">{idx + 1}</span>
                </div>

                <div className={`bg-gradient-to-br from-slate-900 to-slate-800 border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-colors ${idx % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full ${arc.color}`} />
                    <span className="text-gray-400 text-sm font-medium">{arc.episodes}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2">{arc.title}</h3>
                  <p className="text-amber-400 text-sm mb-4">{arc.setting}</p>
                  <p className="text-gray-300 mb-6 leading-relaxed">{arc.summary}</p>

                  <div className="space-y-2">
                    {arc.keyMoments.map((moment, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                        <span className="text-gray-400 text-sm">{moment}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
