import Image from 'next/image'
import { PropsWithChildren } from 'react'
import { config } from '../../utils/config'

import Hero from './Hero'

const Layout = ({ children }: PropsWithChildren) => (
  <main>
    <Hero />
    <Image
      src={`${config.cdn}/images/forest.webp`}
      width={2880}
      height={1267}
      alt="forest"
      layout="responsive"
      quality={100}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP88PT9DQAJLwOe8a6SigAAAABJRU5ErkJggg=="
    />
    {children}
  </main>
)

export default Layout
