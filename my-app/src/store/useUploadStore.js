import { create } from 'zustand'

const useUploadStore = create((set, get) => ({
  // State
  uploadedFile: null,
  preview: null,
  formData: {
    title: "",
    category: "",
    tags: "",
    description: ""
  },
  isUploading: false,
  uploadProgress: 0,
  uploadError: null,
  uploadSuccess: false,

  // File handling
  setUploadedFile: (file) => {
    set({ uploadedFile: file })
    
    // Create preview if file is an image
    if (file && file.type.startsWith('image/')) {
      const previewUrl = URL.createObjectURL(file)
      set({ preview: previewUrl })
    }
  },

  removeFile: () => {
    const { preview } = get()
    
    // Clean up preview URL
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    
    set({ 
      uploadedFile: null, 
      preview: null 
    })
  },

  // Form data handling
  updateFormData: (field, value) => {
    set(state => ({
      formData: {
        ...state.formData,
        [field]: value
      }
    }))
  },

  setFormData: (data) => {
    set({ formData: data })
  },

  resetFormData: () => {
    set({
      formData: {
        title: "",
        category: "",
        tags: "",
        description: ""
      }
    })
  },

  // Upload process
  startUpload: () => {
    set({ 
      isUploading: true, 
      uploadProgress: 0, 
      uploadError: null,
      uploadSuccess: false 
    })
  },

  updateUploadProgress: (progress) => {
    set({ uploadProgress: progress })
  },

  uploadSuccess: () => {
    set({ 
      isUploading: false, 
      uploadProgress: 100, 
      uploadSuccess: true 
    })
  },

  uploadError: (error) => {
    set({ 
      isUploading: false, 
      uploadError: error,
      uploadSuccess: false 
    })
  },

  resetUpload: () => {
    const { preview } = get()
    
    // Clean up preview URL
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    
    set({
      uploadedFile: null,
      preview: null,
      formData: {
        title: "",
        category: "",
        tags: "",
        description: ""
      },
      isUploading: false,
      uploadProgress: 0,
      uploadError: null,
      uploadSuccess: false
    })
  },

  // Validation
  validateForm: () => {
    const { uploadedFile, formData } = get()
    const errors = []

    if (!uploadedFile) {
      errors.push("Please select a file to upload")
    }

    if (!formData.title.trim()) {
      errors.push("Please enter a title")
    }

    if (!formData.category) {
      errors.push("Please select a category")
    }

    // File size validation (10MB limit)
    if (uploadedFile && uploadedFile.size > 10 * 1024 * 1024) {
      errors.push("File size must be less than 10MB")
    }

    // File type validation
    if (uploadedFile && !uploadedFile.type.startsWith('image/')) {
      errors.push("Please select an image file")
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  },

  // Simulate upload process
  simulateUpload: async () => {
    const { uploadedFile, formData } = get()
    const validation = get().validateForm()

    if (!validation.isValid) {
      set({ uploadError: validation.errors.join(", ") })
      return false
    }

    try {
      get().startUpload()

      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 100))
        get().updateUploadProgress(i)
      }

      // Simulate successful upload
      get().uploadSuccess()

      // Return upload data
      return {
        file: uploadedFile,
        ...formData,
        uploadDate: new Date().toISOString(),
        fileSize: uploadedFile.size,
        fileType: uploadedFile.type
      }
    } catch (error) {
      get().uploadError(error.message)
      return false
    }
  },

  // File utilities
  getFileSize: () => {
    const { uploadedFile } = get()
    if (!uploadedFile) return null

    const bytes = uploadedFile.size
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  getFileType: () => {
    const { uploadedFile } = get()
    return uploadedFile ? uploadedFile.type : null
  },

  getFileName: () => {
    const { uploadedFile } = get()
    return uploadedFile ? uploadedFile.name : null
  },

  // Getters
  getUploadedFile: () => get().uploadedFile,
  getPreview: () => get().preview,
  getFormData: () => get().formData,
  isUploading: () => get().isUploading,
  getUploadProgress: () => get().uploadProgress,
  getUploadError: () => get().uploadError,
  isUploadSuccess: () => get().uploadSuccess,
  hasFile: () => !!get().uploadedFile,
  isFormValid: () => get().validateForm().isValid,

  // Reset everything
  reset: () => {
    const { preview } = get()
    
    if (preview) {
      URL.revokeObjectURL(preview)
    }
    
    set({
      uploadedFile: null,
      preview: null,
      formData: {
        title: "",
        category: "",
        tags: "",
        description: ""
      },
      isUploading: false,
      uploadProgress: 0,
      uploadError: null,
      uploadSuccess: false
    })
  }
}))

export default useUploadStore 