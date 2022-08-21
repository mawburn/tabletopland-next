import Image from 'next/image'
import Link from 'next/link'

import { config } from '../../utils/config'
// import Nav from './Nav'
import Right from './Right'
import styles from './styles.module.css'

//interface HeaderBarProps {}

const HeaderBar = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <Link href="/">
        <a>
          <Image
            src={`${config.cdn}/logo.png`}
            width={50}
            height={50}
            priority
            quality={100}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0l4jYBQACuAFrHlRkXwAAAABJRU5ErkJggg=="
            alt="Tabletop.Land"
          />
        </a>
      </Link>
      <Link href="/">
        <a>
          <h1 className={styles.logoText}>Tabletop.Land</h1>
        </a>
      </Link>
    </div>
    <Right />
  </header>
)

export default HeaderBar
