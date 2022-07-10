import Link from 'next/link'

import styles from './styles.module.css'

const Nav = () => (
  <nav className={styles.nav}>
    <ul className={styles.navList}>
      <li>
        <Link href="/collection/all">All</Link>
      </li>
      <li>
        <Link href="/collection/rpg">RPG</Link>
      </li>
      <li>
        <Link href="/collection/wargaming">Wargaming</Link>
      </li>
      <li>
        <Link href="/collection/terrain">Terrain</Link>
      </li>
      <li>
        <Link href="/collection/minis">Minis</Link>
      </li>
      <li className={styles.hideMobile}>
        <Link href="/collection/accessories">Accessories</Link>
      </li>
      <li className={styles.hideMobile}>
        <Link href="/collection/build">
          <a>Build your own</a>
        </Link>
      </li>
      <li className={styles.showMobile}>
        <Link href="/collection/build">
          <a>Other</a>
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
