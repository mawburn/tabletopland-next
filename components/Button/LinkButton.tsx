import clsx from 'clsx'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import styles from './styles.module.css'

interface LinkButtonProps {
  href: string
  secondary: boolean
  className: string
}

const LinkButton = ({
  children,
  className = '',
  href,
  secondary = false,
}: PropsWithChildren<LinkButtonProps>) => (
  <Link href={href}>
    <a className={clsx(styles.button, { [styles.secondary]: secondary }, className)}>{children}</a>
  </Link>
)

export default LinkButton
