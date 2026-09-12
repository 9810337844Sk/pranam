const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

// Cloudinary configuration check
if (!cloudName) {
  console.warn('⚠️ Cloudinary cloud name not set. Set VITE_CLOUDINARY_CLOUD_NAME in your .env file.')
}

if (!preset) {
  console.warn('⚠️ Cloudinary upload preset not set. Set VITE_CLOUDINARY_UPLOAD_PRESET in your .env file.')
}

/** Upload a file straight from the browser with an unsigned preset. */
export async function uploadImage(file: File, folder = 'pranam-software') {
  if (!cloudName || !preset) {
    throw new Error(
      '❌ Cloudinary is not configured properly.\n\n' +
      'Please set these environment variables in your .env file:\n' +
      '• VITE_CLOUDINARY_CLOUD_NAME=your-cloud-name\n' +
      '• VITE_CLOUDINARY_UPLOAD_PRESET=your-upload-preset\n\n' +
      'Get these from your Cloudinary Dashboard → Settings → Product Environment'
    )
  }

  // Validate file
  if (!file) {
    throw new Error('No file provided')
  }

  // Check file size (max 10MB)
  const maxSize = 10 * 1024 * 1024 // 10MB
  if (file.size > maxSize) {
    throw new Error('File size must be less than 10MB')
  }

  // Check file type
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only JPEG, PNG, WebP, and GIF images are allowed')
  }

  const body = new FormData()
  body.append('file', file)
  body.append('upload_preset', preset)
  body.append('folder', folder)
  body.append('resource_type', 'auto')
  body.append('quality', 'auto:good')
  body.append('fetch_format', 'auto')

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body,
    })

    if (!res.ok) {
      const errorData = await res.text()
      console.error('Cloudinary upload error:', errorData)
      throw new Error(`Upload failed: ${res.statusText}`)
    }

    const json = (await res.json()) as { 
      secure_url: string
      public_id: string
      bytes: number
      format: string
      width: number
      height: number
      created_at: string
    }

    console.log('✅ Image uploaded successfully:', json.public_id)
    return json
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/** Build a resized, auto-format delivery URL from a Cloudinary public id. */
export function cld(publicId: string, width = 800, height?: number, options: string = '') {
  if (!cloudName) {
    console.warn('Cloudinary not configured, returning original URL')
    return publicId
  }

  // If it's already a full URL, return as is
  if (publicId.startsWith('http')) {
    return publicId
  }

  let transformations = `f_auto,q_auto,w_${width}`
  
  if (height) {
    transformations += `,h_${height},c_fill`
  }

  if (options) {
    transformations += `,${options}`
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${publicId}`
}

/** Generate responsive image URLs for different screen sizes */
export function responsiveImage(publicId: string, options: { 
  mobile?: number
  tablet?: number 
  desktop?: number
  alt?: string
} = {}) {
  if (!cloudName) return { src: publicId, alt: options.alt || '' }

  const { mobile = 480, tablet = 768, desktop = 1200, alt = '' } = options

  return {
    src: cld(publicId, desktop),
    srcSet: `
      ${cld(publicId, mobile)} ${mobile}w,
      ${cld(publicId, tablet)} ${tablet}w,
      ${cld(publicId, desktop)} ${desktop}w
    `.trim(),
    sizes: `
      (max-width: ${mobile}px) ${mobile}px,
      (max-width: ${tablet}px) ${tablet}px,
      ${desktop}px
    `.trim(),
    alt
  }
}

/** Delete an image from Cloudinary */
export async function deleteImage(publicId: string) {
  if (!cloudName || !preset) {
    throw new Error('Cloudinary not configured')
  }

  const body = new FormData()
  body.append('public_id', publicId)
  body.append('upload_preset', preset)

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: 'POST',
      body,
    })

    const json = await res.json()
    return json
  } catch (error) {
    console.error('Delete image error:', error)
    throw error
  }
}

// Export configuration status for debugging
export const cloudinaryConfig = {
  isConfigured: !!(cloudName && preset),
  cloudName,
  preset,
  status: !cloudName ? 'Missing cloud name' : !preset ? 'Missing upload preset' : 'Configured'
}
