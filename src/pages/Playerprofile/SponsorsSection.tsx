import { Athlete } from "./Types";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, Star, TrendingUp } from "lucide-react";

const SponsorsSection = ({ athlete }: { athlete: Athlete }) => (
  <div className="space-y-6 p-6">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg">
        <Building2 className="w-6 h-6 text-white" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Official Sponsors</h2>
        <p className="text-gray-600 dark:text-gray-400">Brand partnerships and endorsements</p>
      </div>
    </div>

    {athlete.sponsors.length > 0 ? (
      <>
        {/* Sponsors Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Partnership Count</h3>
              </div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {athlete.sponsors.length}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Sponsorships</p>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-emerald-500 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Market Presence</h3>
              </div>
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
                Strong
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Brand Endorsement Level</p>
            </CardContent>
          </Card>
        </div>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {athlete.sponsors.map((sponsor, index) => (
            <Card
              key={index}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden bg-white dark:bg-gray-800"
            >
              <CardContent className="p-0">
                {/* Sponsor Logo Container */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-8 flex items-center justify-center min-h-[120px] group-hover:from-blue-50 group-hover:to-indigo-100 dark:group-hover:from-blue-900/20 dark:group-hover:to-indigo-900/20 transition-all duration-300">
                  <img
                    src={sponsor.imageUrl}
                    alt={sponsor.name}
                    className="max-h-16 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg text-white font-bold text-xl">
                            ${sponsor.name.charAt(0).toUpperCase()}
                          </div>
                        `;
                      }
                    }}
                  />
                  
                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Sponsor Info */}
                <div className="p-4 bg-white dark:bg-gray-800">
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {sponsor.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} 
                        />
                      ))}
                    </div>
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium rounded-full">
                      Official Partner
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Partnership Benefits */}
        <Card className="border-0 bg-gradient-to-r from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 shadow-lg mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Partnership Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-purple-600 dark:text-purple-400 font-semibold">Equipment Support</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Premium gear and equipment</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-purple-600 dark:text-purple-400 font-semibold">Financial Backing</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Training and competition funding</div>
              </div>
              <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg backdrop-blur-sm">
                <div className="text-purple-600 dark:text-purple-400 font-semibold">Brand Exposure</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Marketing and promotional opportunities</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </>
    ) : (
      <Card className="border-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 shadow-lg">
        <CardContent className="p-12 text-center">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gray-200 dark:bg-gray-700 rounded-full">
              <Building2 className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No Sponsors Yet</h3>
          <p className="text-gray-500 dark:text-gray-500">This athlete is currently seeking sponsorship opportunities.</p>
        </CardContent>
      </Card>
    )}
  </div>
);

export default SponsorsSection;