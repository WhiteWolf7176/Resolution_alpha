import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import DashboardPhotoCard from "../components/DashboardPhotoCard";
import { mockUserPhotos } from "../data/mockUserPhotos";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const [sortBy, setSortBy] = useState("recent");
  const [filterCategory, setFilterCategory] = useState("all");

  // Calculate summary statistics
  const totalPhotos = mockUserPhotos.length;
  const totalViews = mockUserPhotos.reduce((sum, photo) => sum + photo.views, 0);
  const totalDownloads = mockUserPhotos.reduce((sum, photo) => sum + photo.downloads, 0);
  const totalRevenue = mockUserPhotos.reduce((sum, photo) => sum + photo.revenue, 0);

  // Filter and sort photos
  const filteredPhotos = mockUserPhotos
    .filter(photo => filterCategory === "all" || photo.category === filterCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.uploadDate) - new Date(a.uploadDate);
        case "views":
          return b.views - a.views;
        case "downloads":
          return b.downloads - a.downloads;
        case "revenue":
          return b.revenue - a.revenue;
        default:
          return 0;
      }
    });

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const categories = ["all", ...new Set(mockUserPhotos.map(photo => photo.category))];

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Welcome back, {user?.user_metadata?.full_name || user?.email}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Photos</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalPhotos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatNumber(totalViews)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Downloads</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{formatNumber(totalDownloads)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                  Sort by
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="recent">Most Recent</option>
                  <option value="views">Most Views</option>
                  <option value="downloads">Most Downloads</option>
                  <option value="revenue">Highest Revenue</option>
                </select>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Link
              to="/upload"
              className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center text-sm sm:text-base"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Upload New Photo
            </Link>
          </div>
        </div>

        {/* Photos Grid */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Your Photos ({filteredPhotos.length})
            </h2>
          </div>
          
          {filteredPhotos.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 sm:p-12 text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No photos found</h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                {filterCategory === "all" 
                  ? "You haven't uploaded any photos yet."
                  : `No photos found in the ${filterCategory} category.`
                }
              </p>
              <Link
                to="/upload"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
              >
                Upload Your First Photo
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredPhotos.map((photo) => (
                <DashboardPhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Performance Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
                {totalPhotos > 0 ? (totalViews / totalPhotos).toFixed(0) : 0}
              </div>
              <div className="text-sm text-gray-600">Avg. Views per Photo</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
                {totalPhotos > 0 ? (totalDownloads / totalPhotos).toFixed(0) : 0}
              </div>
              <div className="text-sm text-gray-600">Avg. Downloads per Photo</div>
            </div>
            <div className="text-center">
              <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">
                ${totalPhotos > 0 ? (totalRevenue / totalPhotos).toFixed(2) : 0}
              </div>
              <div className="text-sm text-gray-600">Avg. Revenue per Photo</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 