import clsx from 'clsx'

import styles from './styles.module.css'

interface RightProps {
  checkoutUrl: string
  cartItems?: boolean
}

const Right = ({ checkoutUrl }: RightProps) => (
  <div className={styles.right}>
    <select className={clsx(styles.rightText, styles.select)}>
      <option value="usd">🇺🇸 USD $</option>
      <option value="cad">🇨🇦 CAD $</option>
    </select>
    <span className={styles.rightText}>Account</span>
    <a href={checkoutUrl}>
      <span role="img" aria-label="cart" className="icon-cart" />
    </a>
  </div>
)

export default Right
