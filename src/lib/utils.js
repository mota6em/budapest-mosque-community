import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Extract YouTube video ID from various URL formats
export function getYouTubeVideoId(youtubeUrl) {
  if (!youtubeUrl) return null
  try {
    const url = new URL(youtubeUrl)
    if (url.hostname.includes('youtu.be')) {
      return url.pathname.replace('/', '') || null
    }
    if (url.hostname.includes('youtube.com')) {
      if (url.pathname === '/watch') {
        return url.searchParams.get('v')
      }
      const pathParts = url.pathname.split('/')
      const watchIndex = pathParts.findIndex(p => p === 'embed' || p === 'shorts' || p === 'v')
      if (watchIndex !== -1 && pathParts[watchIndex + 1]) {
        return pathParts[watchIndex + 1]
      }
    }
    // Fallback: regex search
    const match = youtubeUrl.match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
    return match ? match[1] : null
  } catch {
    const match = String(youtubeUrl).match(/(?:v=|\/)([0-9A-Za-z_-]{11})/)
    return match ? match[1] : null
  }
}

// Build a YouTube thumbnail URL for a given video URL or ID
export function getYouTubeThumbnail(youtubeUrlOrId, quality = 'hqdefault') {
  const id = youtubeUrlOrId?.length === 11 ? youtubeUrlOrId : getYouTubeVideoId(youtubeUrlOrId)
  if (!id) return null
  const allowed = new Set(['default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault'])
  const q = allowed.has(quality) ? quality : 'hqdefault'
  return `https://img.youtube.com/vi/${id}/${q}.jpg`
}