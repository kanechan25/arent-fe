import type { ButtonHTMLAttributes, MouseEventHandler, PropsWithChildren } from 'react'

type ButtonProps = PropsWithChildren<{
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  ariaLabel?: string
}>

const baseButtonClasses =
  'inline-flex items-center justify-center hover:opacity-90 disabled:opacity-60 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed'

export function Button({ children, onClick, className, disabled = false, type = 'button', ariaLabel }: ButtonProps) {
  const composedClassName = [baseButtonClasses, className].filter(Boolean).join(' ')

  return (
    <button type={type} aria-label={ariaLabel} onClick={onClick} disabled={disabled} className={composedClassName}>
      {children}
    </button>
  )
}

export default Button
