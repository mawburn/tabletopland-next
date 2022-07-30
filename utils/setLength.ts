export const setLength = (str: string, length: number) => {
  if (str.length > length) {
    return str.trim().substring(0, length).trim() + '...'
  }

  return str
}
