import Link from 'next/link'

import styles from './styles.module.css'

interface NavProps {
  active?: string
}

const Nav = ({}: NavProps) => (
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
      <li>
        <Link href="/collections/accessories">Accessories</Link>
      </li>
      <li>
        <Link href="/collections/build">
          <a>
            Build <span className="sm:not-sr-only sr-only">your own</span>
          </a>
        </Link>
      </li>
    </ul>
  </nav>
)

export default Nav
