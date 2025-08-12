import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import useAuthStore from "../store/useAuthStore";

const categories = [
  "Nature",
  "Architecture", 
  "Urban",
  "Art",
  "Interior",
  "Portrait",
  "Travel",
  "Food",
  "Technology",
  "Sports"
];

export default function UploadPage() {
  const { user } = useAuthStore();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: "",
    description: ""
  });
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!uploadedFile) {
      alert("Please select a file to upload");
      return;
    }

    if (!formData.title.trim()) {
      alert("Please enter a title");
      return;
    }

    if (!formData.category) {
      alert("Please select a category");
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const submitData = {
        file: uploadedFile,
        ...formData,
        uploader: user?.user_metadata?.full_name || user?.email,
        uploadDate: new Date().toISOString(),
        fileSize: uploadedFile.size,
        fileType: uploadedFile.type
      };

      console.log("Form Data Submitted:", submitData);
      
      // Reset form
      setUploadedFile(null);
      setPreview(null);
      setFormData({
        title: "",
        category: "",
        tags: "",
        description: ""
      });
      setIsUploading(false);
      
      alert("Photo uploaded successfully! Check console for details.");
    }, 2000);
  };

  const removeFile = () => {
    setUploadedFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
      setPreview(null);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-full bg-gray-50 py-6 sm:py-8">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Upload Photo</h1>
          <p className="text-gray-600 text-sm sm:text-base">Share your amazing photos with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* File Upload Section */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Select Photo</h2>
            
            {!uploadedFile ? (
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? isDragReject
                      ? 'border-red-400 bg-red-50'
                      : 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-medium text-gray-900">
                      {isDragActive
                        ? isDragReject
                          ? "File type not supported"
                          : "Drop the photo here"
                        : "Drag & drop a photo here"}
                    </p>
                    <p className="text-gray-500 mt-1 text-sm sm:text-base">
                      or click to browse files
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Supports: JPG, PNG, GIF, WebP (Max 10MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full max-w-full h-auto object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={removeFile}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900">{uploadedFile.name}</span>
                    <span className="text-gray-500">{formatFileSize(uploadedFile.size)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Photo Details Section */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Photo Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a descriptive title for your photo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="nature, landscape, sunset (comma separated)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate tags with commas
                </p>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Tell us about your photo..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>
            </div>
          </div>

          {/* Submit Section */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-600">
                {uploadedFile && (
                  <p>Ready to upload: <span className="font-medium">{uploadedFile.name}</span></p>
                )}
              </div>
              <button
                type="submit"
                disabled={!uploadedFile || isUploading}
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center text-sm sm:text-base"
              >
                {isUploading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Upload Photo
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 