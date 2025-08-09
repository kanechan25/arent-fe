import hexIcon from '@/assets/images/icons/icon_hex.svg'

interface MealButtonProps {
  selected: boolean
  label: string
  icon: string
  onClick: () => void
}

export default function MealButton({ selected, label, icon, onClick }: MealButtonProps) {
  return (
    <button
      onClick={onClick}
      className={[
        'relative mx-auto h-[134px] w-[116px] flex items-center justify-center cursor-pointer transition',
        selected ? 'drop-shadow-[0_10px_20px_rgba(255,204,33,0.9)]' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`filter ${label}`}
    >
      <img src={hexIcon} alt='' className='absolute inset-0 h-full w-full select-none' />
      <span className='relative flex flex-col items-center justify-center gap-1 text-light'>
        <img src={icon} alt='' className='h-14 w-14' />
        <span className='text-lg'>{label}</span>
      </span>
    </button>
  )
}
