import { Sparkles } from 'lucide-react';

export default function Story() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-amber-400 text-sm font-semibold tracking-wider">THE PREMISE</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Reincarnation as Science
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              When a cosmic asteroid carries fragments of <span className="text-amber-400 font-semibold">samskara</span> (impressions of past lives) across continents,
              Rudhra must collect them before they destroy reality.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              The fragments appear in different times and places: <span className="text-amber-300">ancient Varanasi (512 CE)</span>,
              modern Tokyo, colonial Africa, and future Antarctica.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              In each era, he meets <span className="text-rose-400 font-semibold">Mandakini</span>—a goddess trapped in human form,
              searching for him across centuries—and faces <span className="text-red-400 font-semibold">Kumbha</span>,
              the eternal demon who also refuses to die.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-red-600/20 blur-3xl" />
            <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-amber-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-amber-400 mb-6">Samskara Fragments</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-2" />
                  <div>
                    <p className="text-white font-medium mb-1">Quantum Echoes</p>
                    <p className="text-gray-400 text-sm">Each soul leaves impressions across multiple timelines</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-rose-400 mt-2" />
                  <div>
                    <p className="text-white font-medium mb-1">Emotional Energy</p>
                    <p className="text-gray-400 text-sm">Strong emotions crystallize into physical objects</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-400 mt-2" />
                  <div>
                    <p className="text-white font-medium mb-1">Reality Fractures</p>
                    <p className="text-gray-400 text-sm">Too many fragments in one timeline causes collapse</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-2xl text-gray-300 italic font-light">
            "This is not just time travel. This is reincarnation as science,
            <br className="hidden md:block" />
            mythology as physics, and love as the only constant across infinity."
          </p>
        </div>
      </div>
    </section>
  );
}
