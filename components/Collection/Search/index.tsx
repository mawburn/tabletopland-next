import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import styles from './styles.module.css'

interface SearchProps {
  products: Product[]
}

const Search = ({ products }: SearchProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)

  const handleSearch = useDebouncedCallback((query: string) => {
    const _query = query.toLowerCase()

    const newFiltered = filteredProducts.filter(
      p =>
        p.title.toLowerCase().includes(_query) ||
        p.description.toLowerCase().includes(_query) ||
        p.description.toLowerCase().replace('-', '').includes(_query) ||
        p.tags.filter(t => t.toLowerCase().replace('-', '').includes(_query)).length > 0
    )

    setFilteredProducts(newFiltered)
  }, 500)

  return (
    <div>
      <h2>Search for what you need</h2>
      <input type="text" className={styles.input} onChange={e => handleSearch(e.target.value)} />
    </div>
  )
}

export default Search
