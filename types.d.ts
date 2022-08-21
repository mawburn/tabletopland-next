declare interface Product {
  id: string
  title: string
  description: string
  productType: string
  tags: string[]
  vendor?: string
  seo: {
    description: string
  }
  price: {
    max: string
    min: string
  }
  featuredImage: {
    url: string
    height?: number
    width?: number
  }
  images?: [
    {
      id: string
      url: string
      height?: number
      width?: number
    }
  ]
}
