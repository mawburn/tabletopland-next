import Image from 'next/image'
import { config } from '../../utils/config'
import { heroBlur } from './heroBlur'

import styles from './styles.module.css'

const Hero = () => (
  <div className={styles.hero}>
    <Image
      src={`${config.cdn}/images/hero.webp`}
      layout="responsive"
      quality={100}
      width={3840}
      height={2160 - 80}
      placeholder="blur"
      blurDataURL={heroBlur}
      alt="Tabletop.Land Hero Image"
    />
  </div>
)

export default Hero
