import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react'
import FullButton from './FullButton'
import LinkButton from './LinkButton'

interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  href: string
  onClick?: () => void
  secondary?: boolean
  className?: string
  isLink?: boolean
}

const Button = ({
  href,
  children,
  onClick = () => null,
  secondary = false,
  className = '',
  isLink = false,
  ...rest
}: PropsWithChildren<ButtonProps>) =>
  isLink ? (
    <LinkButton href={href} secondary={secondary} className={className}>
      {children}
    </LinkButton>
  ) : (
    <FullButton className={className} onClick={onClick} secondary={secondary} {...rest}>
      {children}
    </FullButton>
  )

export default Button
