export const getPrice = (price: string) => {
  try {
    const localPrice = parseFloat(price)

    if (localPrice > 0) {
      return `$${localPrice.toFixed(2)}`
    }

    return 'Free'
  } catch {
    return 'Free'
  }
}
