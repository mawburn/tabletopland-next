export const getTitle = (title?: string) => {
  if (!title || title === 'Tabletop.Land') {
    return 'Tabletop.Land'
  }

  return `${title} - Tabletop.Land`
}
