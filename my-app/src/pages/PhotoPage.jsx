import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { mockPhotos } from "../data/mockPhotos";

export default function PhotoPage() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadCount, setDownloadCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const foundPhoto = mockPhotos.find(p => p.id === parseInt(id));
      if (foundPhoto) {
        setPhoto(foundPhoto);
        setDownloadCount(foundPhoto.downloads);
        setViewCount(foundPhoto.views + 1); // Increment view count
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleDownload = () => {
    setDownloadCount(prev => prev + 1);
    // In a real app, this would trigger an actual download
    const link = document.createElement('a');
    link.href = photo.imageURL;
    link.download = `${photo.title}.jpg`;
    link.click();
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <>
        <Helmet>
          <title>Loading Photo - MyApp</title>
          <meta name="description" content="Loading photo details..." />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading photo...</p>
          </div>
        </div>
      </>
    );
  }

  if (!photo) {
    return (
      <>
        <Helmet>
          <title>Photo Not Found - MyApp</title>
          <meta name="description" content="The photo you're looking for doesn't exist." />
        </Helmet>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Photo Not Found</h1>
            <p className="text-gray-600 mb-6">The photo you're looking for doesn't exist.</p>
            <Link 
              to="/" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Generate meta description
  const metaDescription = `${photo.title} by ${photo.uploader} - ${photo.category} photography. ${formatNumber(photo.views)} views, ${formatNumber(photo.downloads)} downloads. High-quality image available for download.`;

  // Generate OpenGraph tags
  const ogTitle = `${photo.title} by ${photo.uploader}`;
  const ogDescription = `${photo.title} - ${photo.category} photography with ${formatNumber(photo.views)} views and ${formatNumber(photo.downloads)} downloads.`;
  const ogImage = photo.imageURL;
  const ogUrl = `${window.location.origin}/photo/${photo.id}`;

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{`${photo.title} by ${photo.uploader} - MyApp`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={`${photo.title}, ${photo.category}, photography, ${photo.uploader}, download`} />
        <meta name="author" content={photo.uploader} />
        
        {/* OpenGraph Meta Tags */}
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={ogUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MyApp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={photo.title} />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={ogTitle} />
        <meta name="twitter:description" content={ogDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={photo.title} />
        
        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="image" content={ogImage} />
        <meta name="category" content={photo.category} />
        <meta name="uploader" content={photo.uploader} />
        <meta name="views" content={photo.views.toString()} />
        <meta name="downloads" content={photo.downloads.toString()} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={ogUrl} />
        
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "name": photo.title,
            "description": metaDescription,
            "image": photo.imageURL,
            "url": ogUrl,
            "author": {
              "@type": "Person",
              "name": photo.uploader
            },
            "contentUrl": photo.imageURL,
            "license": "https://creativecommons.org/licenses/by/4.0/",
            "acquireLicensePage": ogUrl,
            "creditText": photo.uploader,
            "creator": {
              "@type": "Person",
              "name": photo.uploader
            },
            "uploadDate": new Date().toISOString(),
            "interactionStatistic": [
              {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/ViewAction",
                "userInteractionCount": photo.views
              },
              {
                "@type": "InteractionCounter",
                "interactionType": "https://schema.org/DownloadAction",
                "userInteractionCount": photo.downloads
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-full bg-gray-50">
                      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 sm:mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <Link to="/" className="hover:text-blue-600">Home</Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link to={`/category/${photo.category.toLowerCase()}`} className="hover:text-blue-600">
                  {photo.category}
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-900">{photo.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Photo Display */}
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={photo.imageURL}
                  alt={photo.title}
                  className="w-full max-w-full h-auto object-cover"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleDownload}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center text-sm sm:text-base">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  Share
                </button>
              </div>
            </div>

            {/* Photo Details */}
            <div className="space-y-6 sm:space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">{photo.title}</h1>
                
                <div className="flex items-center space-x-4 mb-6 sm:mb-8">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{photo.uploader}</p>
                      <p className="text-sm text-gray-600">Photographer</p>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6 sm:mb-8">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">{formatNumber(viewCount)}</div>
                    <div className="text-sm text-gray-600">Views</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">{formatNumber(downloadCount)}</div>
                    <div className="text-sm text-gray-600">Downloads</div>
                  </div>
                </div>

                {/* Category */}
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Category</h3>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {photo.category}
                  </span>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {[photo.category.toLowerCase(), 'photography', 'high-quality', 'professional'].map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Related Photos */}
              <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Related Photos</h3>
                <div className="grid grid-cols-2 gap-4">
                  {mockPhotos
                    .filter(p => p.id !== photo.id && p.category === photo.category)
                    .slice(0, 4)
                    .map((relatedPhoto) => (
                      <Link
                        key={relatedPhoto.id}
                        to={`/photo/${relatedPhoto.id}`}
                        className="group"
                      >
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={relatedPhoto.imageURL}
                            alt={relatedPhoto.title}
                            className="w-full max-w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                        </div>
                        <p className="text-sm font-medium text-gray-900 mt-2 line-clamp-1">
                          {relatedPhoto.title}
                        </p>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 