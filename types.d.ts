declare interface Product {
  id: string
  title: string
  description: string
  productType: string
  tags: string[]
  vendor: string
  price: {
    max: string
    min: string
  }
  featuredImage?: {
    altText: string
    url: string
    height: number
    width: number
  }
  images?: [
    {
      id: string
      altText: string
      url: string
      height: number
      width: number
    }
  ]
}
