import Link from 'next/link'

import styles from './styles.module.css'

const Nav = () => (
  <nav className={styles.nav}>
    <ul className={styles.navList}>
      <li>
        <Link href="/collections/all">All</Link>
      </li>
      <li>
        <Link href="/collections/rpg">RPG</Link>
      </li>
      <li>
        <Link href="/collections/wargaming">Wargaming</Link>
      </li>
      <li>
        <Link href="/collections/terrain">Terrain</Link>
      </li>
      <li>
        <Link href="/collections/minis">Minis</Link>
      </li>
      <li className={styles.hideMobile}>
        <Link href="/collections/accessories">Accessories</Link>
      </li>
      <li className={styles.hideMobile}>
        <Link href="/collections/build">
          <a>Build your own</a>
        </Link>
      </li>
      <li className={styles.showMobile}>
        <Link href="/collections/build">
          <a>Other</a>
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
