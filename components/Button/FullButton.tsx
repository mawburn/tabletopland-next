import clsx from 'clsx'
import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react'

import styles from './styles.module.css'

interface FullButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  onClick: () => void
  secondary: boolean
  className: string
}

const FullButton = ({
  children,
  onClick,
  className = '',
  type = 'button',
  ...rest
}: PropsWithChildren<FullButtonProps>) => (
  <button className={clsx(styles.button, className)} type={type} onClick={onClick} {...rest}>
    {children}
  </button>
)

export default FullButton
