interface Config {
  cdn: string
  shopify: string
  token: string
  breakpoint: {
    sm: string
    md: string
    lg: string
    xl: string
    twoXl: string
  }
}

export const config: Config = {
  cdn: 'https://cdn.tabletop.media/tabletop.land/',
  shopify: process.env.DOMAIN!,
  token: process.env.TOKEN!,
  breakpoint: {
    sm: '@media (min-width: 640px)',
    md: '@media (min-width: 768px)',
    lg: '@media (min-width: 1024px)',
    xl: '@media (min-width: 1280px)',
    twoXl: '@media (min-width: 1536px)',
  },
}
