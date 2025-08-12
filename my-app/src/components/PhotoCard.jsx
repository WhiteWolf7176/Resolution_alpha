import { Link } from "react-router-dom";

export default function PhotoCard({ photo }) {
  const { id, title, imageURL, uploader, views, downloads, category } = photo;

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative group">
        <img
          src={imageURL}
          alt={title}
          className="w-full max-w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              to={`/photo/${id}`}
              className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base shadow-lg"
            >
              View Details
            </Link>
          </div>
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
            {category}
          </span>
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 text-sm sm:text-base leading-tight">{title}</h3>
        <p className="text-gray-600 text-xs sm:text-sm mb-3">by {uploader}</p>
        <div className="flex justify-between text-xs sm:text-sm text-gray-500">
          <span className="flex items-center">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.857 6.027 2 12 2s10.268 3.857 11.542 8c-1.274 4.143-5.568 8-11.542 8S1.732 14.143.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
            {formatNumber(views)} views
          </span>
          <span className="flex items-center">
            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            {formatNumber(downloads)} downloads
          </span>
        </div>
      </div>
    </div>
  );
} 