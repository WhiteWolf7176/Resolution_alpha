import { Link } from "react-router-dom";

export default function DashboardPhotoCard({ photo }) {
  const { id, title, imageURL, uploadDate, views, downloads, revenue, category } = photo;

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative group">
        <img 
          src={imageURL} 
          alt={title} 
          className="w-full max-w-full h-auto object-cover" 
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              to={`/photo/${id}`}
              className="bg-white text-gray-800 px-3 sm:px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            {category}
          </span>
        </div>
        <div className="absolute top-2 right-2">
          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            ${revenue.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 line-clamp-1 flex-1 mr-2 text-sm sm:text-base">{title}</h3>
          <div className="flex space-x-1 sm:space-x-2">
            <button className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button className="text-red-600 hover:text-red-800 text-xs sm:text-sm">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className="text-xs text-gray-500 mb-3">Uploaded on {formatDate(uploadDate)}</div>
        <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
          <div>
            <div className="text-sm sm:text-base font-semibold text-blue-600">{formatNumber(views)}</div>
            <div className="text-xs text-gray-500">Views</div>
          </div>
          <div>
            <div className="text-sm sm:text-base font-semibold text-green-600">{formatNumber(downloads)}</div>
            <div className="text-xs text-gray-500">Downloads</div>
          </div>
          <div>
            <div className="text-sm sm:text-base font-semibold text-purple-600">${revenue.toFixed(2)}</div>
            <div className="text-xs text-gray-500">Revenue</div>
          </div>
        </div>
      </div>
    </div>
  );
} 