interface Config {
  cdn: string
  shopify: string
  token: string
}

export const config: Config = {
  cdn: 'https://storage.googleapis.com/ttl-assets',
  shopify: process.env.DOMAIN!,
  token: process.env.TOKEN!,
}
