// import { useState } from 'react'

import Image from 'next/image'

import styles from './styles.module.css'
import { trimDesc } from './trimDesc'

interface CollectonProps {
  products: Product[]
}

export const Collection = ({ products }: CollectonProps) => {
  // const [search, setSearch] = useState('')
  return (
    <ul className={styles.collection}>
      {products.map(p => (
        <li key={p.id}>
          <h3>{p.title.split('-')[0].trim()}</h3>
          <div className={styles.img}>
            <Image
              src={p.featuredImage.url}
              layout="fill"
              objectFit="contain"
              alt={p.title}
              loading="lazy"
            />
          </div>
          <div className="text-center px-2 overflow-clip">
            <span className="font-semibold text-sm">Price:</span>{' '}
            <span className="text-sm">{p.price.min}</span>
            {p.price.max.toLowerCase() !== 'free' ? (
              <>
                <span className="text-xs inline-block px-1">to</span>
                <span className="text-sm">{p.price.max}</span>
              </>
            ) : (
              ''
            )}
            <p className="block text-xs text-left w-64 h-16 overflow-hidden text-ellipsis indent-2 pt-2">
              {trimDesc(p.description)}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
