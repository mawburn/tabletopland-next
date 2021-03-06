import clsx from 'clsx'

import styles from './styles.module.css'

interface RightProps {
  cartItems?: boolean
}

const Right = ({}: RightProps) => (
  <div className={styles.right}>
    <select className={clsx(styles.rightText, styles.select)}>
      <option value="usd">πΊπΈ USD $</option>
      <option value="cad">π¨π¦ CAD $</option>
    </select>
    <span className={styles.rightText}>Account</span>
    <span role="img" aria-label="cart" className="icon-cart" />
  </div>
)

export default Right
