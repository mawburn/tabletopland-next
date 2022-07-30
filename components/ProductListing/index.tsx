import Image from 'next/image'
import { useState } from 'react'

import { setLength } from '../../utils/setLength'
import styles from './styles.module.css'

interface ProductListingProps {
  product: Product
}

const ProductListing = ({ product }: ProductListingProps) => {
  const [imgIndex, setImgIndex] = useState<number>(0)

  const handleHover = (index: number) => {
    setImgIndex(index)
  }

  return (
    <div className={styles.container} title={product.title}>
      <h3>{setLength(product.title, 30)}</h3>
      <p className="my-1 text-xs text-center">
        ${Number(product.price.min).toFixed(2)}
        {product.price.max > product.price.min ? ` - $${Number(product.price.max).toFixed(2)}` : ''}
      </p>
      <div className={styles.imgContainer}>
        <Image
          src={product.images![imgIndex].url}
          width={240}
          height={240}
          objectFit="cover"
          quality={100}
          alt={product.title}
        />
      </div>
      <div className="mt-2">
        <div className="text-center text-sm font-bold">{setLength(product.vendor, 25)}</div>
      </div>
      <div className={styles.moreImages}>
        {product.images!.slice(1).map((img, i) => (
          <div
            className={styles.moreWrapper}
            key={img.id}
            onMouseEnter={() => handleHover(i + 1)}
            onMouseLeave={() => setImgIndex(0)}
          >
            <Image
              src={img.url}
              width={50}
              height={50}
              objectFit="cover"
              alt={product.title}
              quality={50}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductListing
