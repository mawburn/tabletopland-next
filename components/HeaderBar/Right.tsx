import clsx from 'clsx'

import styles from './styles.module.css'

interface RightProps {
  cartItems?: boolean
}

const Right = ({}: RightProps) => (
  <div className={styles.right}>
    <select className={clsx(styles.rightText, styles.select)}>
      <option value="usd">🇺🇸 USD $</option>
      <option value="cad">🇨🇦 CAD $</option>
    </select>
    <span className={styles.rightText}>Account</span>
    <span role="img" aria-label="cart" className="icon-cart" />
  </div>
)

export default Right
