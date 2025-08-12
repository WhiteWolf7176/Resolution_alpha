export const mockPhotos = [
  {
    id: 1,
    title: "Mountain Sunset",
    imageURL: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    uploader: "John Doe",
    views: 15420,
    downloads: 2340,
    category: "Nature"
  },
  {
    id: 2,
    title: "Urban Architecture",
    imageURL: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    uploader: "Jane Smith",
    views: 8920,
    downloads: 1560,
    category: "Architecture"
  },
  {
    id: 3,
    title: "Ocean Waves",
    imageURL: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    uploader: "Mike Johnson",
    views: 12340,
    downloads: 2100,
    category: "Nature"
  },
  {
    id: 4,
    title: "City Lights",
    imageURL: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=300&fit=crop",
    uploader: "Sarah Wilson",
    views: 18760,
    downloads: 3200,
    category: "Urban"
  },
  {
    id: 5,
    title: "Forest Path",
    imageURL: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    uploader: "David Brown",
    views: 9870,
    downloads: 1450,
    category: "Nature"
  },
  {
    id: 6,
    title: "Modern Interior",
    imageURL: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
    uploader: "Lisa Davis",
    views: 11230,
    downloads: 1890,
    category: "Interior"
  },
  {
    id: 7,
    title: "Desert Landscape",
    imageURL: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    uploader: "Tom Anderson",
    views: 7650,
    downloads: 980,
    category: "Nature"
  },
  {
    id: 8,
    title: "Abstract Art",
    imageURL: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
    uploader: "Emma Taylor",
    views: 14560,
    downloads: 2670,
    category: "Art"
  }
];

// Separate data for Latest and Trending sections
export const latestPhotos = mockPhotos.slice(0, 4);
export const trendingPhotos = mockPhotos.slice(4, 8); 