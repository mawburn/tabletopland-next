import clsx from 'clsx'
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react'

import styles from './styles.module.css'

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  onClick: () => void
  children: ReactNode
  className?: string
}

const Button = ({ children, onClick, className = '', type = 'button', ...rest }: ButtonProps) => (
  <button className={clsx(styles.button, className)} type={type} onClick={onClick} {...rest}>
    {children}
  </button>
)

export default Button
