import Image from 'next/image'

import { config } from '../../utils/config'
import LinkButton from '../LinkButton'
import { heroBlur } from './heroBlur'
import styles from './styles.module.css'

const Hero = () => (
  <div className={styles.hero}>
    <Image
      src={`${config.cdn}/hero-gradient.webp`}
      layout="fill"
      quality={100}
      objectFit="cover"
      placeholder="blur"
      blurDataURL={heroBlur}
      alt="Tabletop.Land"
    />
    <div className={styles.heroText}>
      <h2>Buy or sell tabletop terrain &amp; miniatures</h2>
      <p>
        Tabletop.Land is a marketplace to buy or sell handmade tabletop goodies from people just
        like you!
      </p>
      <LinkButton href="/collections/all">See our full catalog</LinkButton>
    </div>
  </div>
)

export default Hero
