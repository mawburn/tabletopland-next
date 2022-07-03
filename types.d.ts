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
  featuredImage: {
    url: string
    altText: string
    width: number
    height: number
  }
}
