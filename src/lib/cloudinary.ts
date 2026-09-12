const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

/** Upload a file straight from the browser with an unsigned preset. */
export async function uploadImage(file: File, folder = 'pranam') {
  if (!cloudName || !preset) {
    throw new Error('Cloudinary is not configured — set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET')
  }
  const body = new FormData()
  body.append('file', file)
  body.append('upload_preset', preset)
  body.append('folder', folder)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body,
  })
  if (!res.ok) throw new Error('Upload failed')
  const json = (await res.json()) as { secure_url: string; public_id: string }
  return json
}

/** Build a resized, auto-format delivery URL from a Cloudinary public id. */
export function cld(publicId: string, width = 800) {
  if (!cloudName) return publicId
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_${width}/${publicId}`
}
