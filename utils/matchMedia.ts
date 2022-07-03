export const matchMedia = (query: string) => {
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches
  }

  return false
}
