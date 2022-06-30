import clsx from 'clsx'
import Link from 'next/link'
import { PropsWithChildren } from 'react'
import styles from './styles.module.css'

interface LinkButtonProps {
  href: string
  className?: string
}

const LinkButton = ({ children, className = '', href }: PropsWithChildren<LinkButtonProps>) => (
  <Link href={href}>
    <a className={clsx(styles.button, className)}>{children}</a>
  </Link>
)

export default LinkButton
