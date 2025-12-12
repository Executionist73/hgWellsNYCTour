import { BookOpen, MapPin, Clock, Users } from "lucide-react";

export default function Header() {
  return (
    <header className="relative w-full mb-8">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20 rounded-lg"></div>
      <div className="relative px-4 py-8 sm:px-6">
        {/* Title Section */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight text-amber-900 sm:text-5xl md:text-6xl">
              Wellsian NYC Tour
            </h1>
            <p className="mt-2 font-serif text-lg italic text-amber-800/80 sm:text-xl">
              A Self-Guided Walking Tour Through New York City
            </p>
          </div>
        </div>

        {/* Combined Bio Section */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-amber-900/10 rounded-lg p-6 border-2 border-amber-900/20">
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="shrink-0">
                <div className="w-24 h-24 rounded-full bg-amber-900/20 border-2 border-amber-900/30 flex items-center justify-center mx-auto sm:mx-0">
                  <BookOpen className="h-12 w-12 text-amber-900" />
                </div>
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-2xl font-bold text-amber-900 mb-4">About This Tour</h2>
                <p className="font-serif text-amber-900/90 leading-relaxed mb-4">
                  A self-guided walking/subway tour of New York City locations with an H.G. Wells connection. 
                  Follow in the footsteps of the legendary author's 1906 visit to America, and explore how his 
                  ideas about education, progress, and civilization intersected with the rapidly growing metropolis.
                </p>
                <p className="font-serif text-amber-900/90 leading-relaxed">
                  This tour traces Wells' actual journey through NYC, from the academic institutions of Morningside 
                  Heights to the iconic landmarks of Lower Manhattan. Each location features excerpts from Wells' 
                  writings and historical context about his experiences in the city.
                </p>
              </div>
            </div>

            {/* Tour Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t border-amber-900/20">
              <div className="bg-amber-900/10 rounded-lg p-4 border border-amber-900/20 text-center">
                <MapPin className="h-6 w-6 text-amber-900 mx-auto mb-2" />
                <h3 className="font-serif font-semibold text-amber-900 mb-1">11 Locations</h3>
                <p className="text-sm text-amber-800/80">Explore Wells' New York journey</p>
              </div>
              <div className="bg-amber-900/10 rounded-lg p-4 border border-amber-900/20 text-center">
                <Clock className="h-6 w-6 text-amber-900 mx-auto mb-2" />
                <h3 className="font-serif font-semibold text-amber-900 mb-1">Self-Guided</h3>
                <p className="text-sm text-amber-800/80">Walking, subway, or bike</p>
              </div>
              <div className="bg-amber-900/10 rounded-lg p-4 border border-amber-900/20 text-center">
                <Users className="h-6 w-6 text-amber-900 mx-auto mb-2" />
                <h3 className="font-serif font-semibold text-amber-900 mb-1">Audio & Text</h3>
                <p className="text-sm text-amber-800/80">Rich historical narratives</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

