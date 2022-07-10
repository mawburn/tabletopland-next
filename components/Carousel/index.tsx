import Image from 'next/image'
import { useState, useRef, useEffect, useCallback } from 'react'

import styles from './styles.module.css'

interface CarouselProps {
  title: string
  products: Product[]
}

const Carousel = ({ products, title }: CarouselProps) => {
  const maxScrollWidth = useRef(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  const carousel = useRef<HTMLDivElement>(null)

  const movePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }, [currentIndex])

  const moveNext = useCallback(() => {
    if ((carousel?.current?.offsetWidth ?? 1) * currentIndex <= maxScrollWidth.current) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }, [currentIndex])

  const isDisabled = useCallback(
    (direction: string) => {
      if (direction === 'prev') {
        return currentIndex <= 0
      }

      if (direction === 'next' && carousel.current !== null) {
        return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      }

      return false
    },
    [currentIndex]
  )

  useEffect(() => {
    if (carousel?.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex
    }
  }, [currentIndex])

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0
  }, [])

  return (
    <div className={styles.wrapper}>
      <h2 className="flex items-center justify-center px-3">
        <button
          onClick={movePrev}
          disabled={isDisabled('prev')}
          className="disabled:text-textColor/25"
        >
          <span role="img" aria-label="left" className="pr-2 icon-left text-3xl font-bold" />
          <span className="sr-only">Prev</span>
        </button>
        {title}{' '}
        <button
          onClick={moveNext}
          disabled={isDisabled('next')}
          className="disabled:text-textColor/25"
        >
          <span role="img" aria-label="right" className="pl-2 icon-right text-3xl font-bold" />
          <span className="sr-only">Next</span>
        </button>
      </h2>
      <div className={styles.carousel}>
        <div
          ref={carousel}
          className="carousel-container relative flex gap-1 overflow-hidden scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
        >
          {products.map((p: Product) => (
            <div key={p.id} className={styles.item}>
              <a
                href="#"
                className="h-full w-full aspect-square block bg-origin-padding bg-left-top bg-cover bg-no-repeat z-0"
              >
                <Image
                  layout="fill"
                  src={p.featuredImage?.url || ''}
                  alt={p.title}
                  loading="lazy"
                />
              </a>
              <a
                href="#"
                className="flex flex-col justify-between h-full w-full aspect-square block absolute top-0 left-0 transition-opacity duration-300 opacity-0 hover:opacity-100 bg-primary/75 z-10"
              >
                <h3 className="text-lg text-lightText font-sans py-4 px-3 text-center tracking-wide">
                  {p.title}
                  <br />
                  <span className="text-sm">by {p.vendor}</span>
                </h3>
                <span className="text-lightText py-2">
                  ${Number(p.price.min).toFixed(2)}{' '}
                  {p.price.max && p.price.max !== p.price.min
                    ? `- $${Number(p.price.max).toFixed(2)}`
                    : ''}
                </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
