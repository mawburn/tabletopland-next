import Image from 'next/image'

import { setLength } from '../../utils/setLength'
import styles from './styles.module.css'

interface ProductListingProps {
  product: Product
}

const ProductListing = ({ product }: ProductListingProps) => (
  <div className={styles.container}>
    <h3>{setLength(product.title, 30)}</h3>
    <div className={styles.imgContainer}>
      <Image
        src={product.images![0].url}
        width={240}
        height={240}
        objectFit="cover"
        alt={product.title}
      />
    </div>
    <div className="mt-2">
      <p className="text-xs text-center">
        ${Number(product.price.min).toFixed(2)}
        {product.price.max > product.price.min ? ` - $${Number(product.price.max).toFixed(2)}` : ''}
      </p>
      <div className="text-center text-sm font-bold">{product.vendor}</div>
    </div>
  </div>
)

export default ProductListing
