import PhotoCard from "../components/PhotoCard";
import { latestPhotos, trendingPhotos } from "../data/mockPhotos";

export default function HomePage() {
  return (
    <div className="flex-1 w-full min-h-screen bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="bg-white -mx-6">
          <div className="py-16 sm:py-20 lg:py-28">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight">
                Discover Amazing Photos
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
                High-quality royalty-free images from creators around the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <button className="w-full sm:w-auto bg-blue-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Start Browsing
                </button>
                <button className="w-full sm:w-auto bg-white text-gray-700 border-2 border-gray-300 px-8 sm:px-10 py-4 sm:py-5 rounded-full text-lg sm:text-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Upload Your Work
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-12 sm:py-16 lg:py-20">
          {/* Latest Photos Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-10 gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Latest Photos</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base hover:underline transition-all duration-200 px-4 py-2 rounded-lg hover:bg-blue-50">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {latestPhotos.slice(0, 6).map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          </section>

          {/* Trending Photos Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 sm:mb-10 gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Trending Photos</h2>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm sm:text-base hover:underline transition-all duration-200 px-4 py-2 rounded-lg hover:bg-blue-50">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {trendingPhotos.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          </section>

          {/* Categories Section */}
          <section className="mb-16 sm:mb-20 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-10">Browse by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 sm:gap-6">
              {["Nature", "Architecture", "Urban", "Art", "Interior", "Portrait", "Travel", "Food"].map((category) => (
                <button
                  key={category}
                  className="bg-white rounded-lg p-4 sm:p-6 text-center shadow-md hover:shadow-lg transition-all duration-200 hover:bg-gray-50 transform hover:-translate-y-1"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">{category}</h3>
                </button>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-white rounded-xl shadow-lg p-8 sm:p-10 lg:p-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 text-center">Platform Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-600 mb-2 sm:mb-3">50K+</div>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg">Photos Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-green-600 mb-2 sm:mb-3">10K+</div>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg">Active Photographers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-purple-600 mb-2 sm:mb-3">1M+</div>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-orange-600 mb-2 sm:mb-3">100+</div>
                <div className="text-gray-600 text-sm sm:text-base lg:text-lg">Categories</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
} 