import type { MouseEventHandler } from 'react'
import arrowUp from '@/assets/images/icons/icon_up.svg'

type GoToTopProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  ariaLabel?: string
}

const baseClasses =
  'fixed bottom-8 right-6 md:bottom-18 md:right-10 w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-gray-400 bg-light/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-light'

export function GoToTop({ onClick, className, ariaLabel = 'go-to-top' }: GoToTopProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    if (onClick) onClick(event)
    if (!event.defaultPrevented) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const composedClassName = [baseClasses, className].filter(Boolean).join(' ')

  return (
    <button aria-label={ariaLabel} onClick={handleClick} className={composedClassName}>
      <img src={arrowUp} alt='arrow up' className='w-6 h-6' />
    </button>
  )
}

export default GoToTop
