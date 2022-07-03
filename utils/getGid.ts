export const getGid = (gid: string): string => {
  return gid.split('/').slice(-1)[0]
}
