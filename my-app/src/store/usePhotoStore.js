import { create } from 'zustand'
import { mockPhotos } from '../data/mockPhotos'
import { mockUserPhotos } from '../data/mockUserPhotos'

const usePhotoStore = create((set, get) => ({
  // State
  allPhotos: mockPhotos,
  userPhotos: mockUserPhotos,
  latestPhotos: mockPhotos.slice(0, 4),
  trendingPhotos: mockPhotos.slice(4, 8),
  categories: [
    "Nature", "Architecture", "Urban", "Art", "Interior", 
    "Portrait", "Travel", "Food", "Technology", "Sports"
  ],
  selectedCategory: null,
  searchQuery: "",
  loading: false,
  currentPhoto: null,

  // Actions
  setAllPhotos: (photos) => set({ allPhotos: photos }),
  
  setUserPhotos: (photos) => set({ userPhotos: photos }),
  
  setLatestPhotos: (photos) => set({ latestPhotos: photos }),
  
  setTrendingPhotos: (photos) => set({ trendingPhotos: photos }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setLoading: (loading) => set({ loading }),
  
  setCurrentPhoto: (photo) => set({ currentPhoto: photo }),

  // Get photo by ID
  getPhotoById: (id) => {
    const { allPhotos } = get()
    return allPhotos.find(photo => photo.id === parseInt(id))
  },

  // Get user photo by ID
  getUserPhotoById: (id) => {
    const { userPhotos } = get()
    return userPhotos.find(photo => photo.id === parseInt(id))
  },

  // Filter photos by category
  getPhotosByCategory: (category) => {
    const { allPhotos } = get()
    if (!category) return allPhotos
    return allPhotos.filter(photo => photo.category === category)
  },

  // Search photos
  searchPhotos: (query) => {
    const { allPhotos } = get()
    if (!query) return allPhotos
    const lowercaseQuery = query.toLowerCase()
    return allPhotos.filter(photo => 
      photo.title.toLowerCase().includes(lowercaseQuery) ||
      photo.uploader.toLowerCase().includes(lowercaseQuery) ||
      photo.category.toLowerCase().includes(lowercaseQuery)
    )
  },

  // Get filtered and sorted photos
  getFilteredPhotos: () => {
    const { allPhotos, selectedCategory, searchQuery } = get()
    let filtered = allPhotos

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(photo => photo.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(photo => 
        photo.title.toLowerCase().includes(lowercaseQuery) ||
        photo.uploader.toLowerCase().includes(lowercaseQuery) ||
        photo.category.toLowerCase().includes(lowercaseQuery)
      )
    }

    return filtered
  },

  // Get user's filtered photos
  getUserFilteredPhotos: () => {
    const { userPhotos, selectedCategory, searchQuery } = get()
    let filtered = userPhotos

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(photo => photo.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      filtered = filtered.filter(photo => 
        photo.title.toLowerCase().includes(lowercaseQuery)
      )
    }

    return filtered
  },

  // Add new photo (simulate upload)
  addPhoto: (photoData) => {
    const { userPhotos } = get()
    const newPhoto = {
      id: Date.now(), // Simple ID generation
      ...photoData,
      views: 0,
      downloads: 0,
      uploadDate: new Date().toISOString(),
      status: 'active'
    }
    
    set({ 
      userPhotos: [newPhoto, ...userPhotos],
      allPhotos: [newPhoto, ...get().allPhotos]
    })
    
    return newPhoto
  },

  // Update photo
  updatePhoto: (id, updates) => {
    const { userPhotos, allPhotos } = get()
    
    const updatedUserPhotos = userPhotos.map(photo => 
      photo.id === id ? { ...photo, ...updates } : photo
    )
    
    const updatedAllPhotos = allPhotos.map(photo => 
      photo.id === id ? { ...photo, ...updates } : photo
    )
    
    set({ 
      userPhotos: updatedUserPhotos,
      allPhotos: updatedAllPhotos
    })
  },

  // Delete photo
  deletePhoto: (id) => {
    const { userPhotos, allPhotos } = get()
    
    set({
      userPhotos: userPhotos.filter(photo => photo.id !== id),
      allPhotos: allPhotos.filter(photo => photo.id !== id)
    })
  },

  // Increment view count
  incrementViews: (id) => {
    const { allPhotos, userPhotos } = get()
    
    const updatedAllPhotos = allPhotos.map(photo => 
      photo.id === id ? { ...photo, views: photo.views + 1 } : photo
    )
    
    const updatedUserPhotos = userPhotos.map(photo => 
      photo.id === id ? { ...photo, views: photo.views + 1 } : photo
    )
    
    set({ 
      allPhotos: updatedAllPhotos,
      userPhotos: updatedUserPhotos
    })
  },

  // Increment download count
  incrementDownloads: (id) => {
    const { allPhotos, userPhotos } = get()
    
    const updatedAllPhotos = allPhotos.map(photo => 
      photo.id === id ? { ...photo, downloads: photo.downloads + 1 } : photo
    )
    
    const updatedUserPhotos = userPhotos.map(photo => 
      photo.id === id ? { ...photo, downloads: photo.downloads + 1 } : photo
    )
    
    set({ 
      allPhotos: updatedAllPhotos,
      userPhotos: updatedUserPhotos
    })
  },

  // Get photo statistics
  getPhotoStats: () => {
    const { allPhotos, userPhotos } = get()
    
    const totalPhotos = allPhotos.length
    const totalViews = allPhotos.reduce((sum, photo) => sum + photo.views, 0)
    const totalDownloads = allPhotos.reduce((sum, photo) => sum + photo.downloads, 0)
    
    const userTotalPhotos = userPhotos.length
    const userTotalViews = userPhotos.reduce((sum, photo) => sum + photo.views, 0)
    const userTotalDownloads = userPhotos.reduce((sum, photo) => sum + photo.downloads, 0)
    
    return {
      global: { totalPhotos, totalViews, totalDownloads },
      user: { totalPhotos: userTotalPhotos, totalViews: userTotalViews, totalDownloads: userTotalDownloads }
    }
  },

  // Clear filters
  clearFilters: () => set({ selectedCategory: null, searchQuery: "" }),

  // Reset store
  reset: () => set({
    allPhotos: mockPhotos,
    userPhotos: mockUserPhotos,
    latestPhotos: mockPhotos.slice(0, 4),
    trendingPhotos: mockPhotos.slice(4, 8),
    selectedCategory: null,
    searchQuery: "",
    loading: false,
    currentPhoto: null
  })
}))

export default usePhotoStore 