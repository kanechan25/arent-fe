import { TransitionButton } from '@/types/myPage'

export default function TransitionBtn({ label, content, icon, onClick }: TransitionButton) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className='relative w-[288px] h-[288px] border-22 border-primary-300 overflow-hidden cursor-pointer transition-transform hover:scale-103 bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400/70'
    >
      <img
        src={icon}
        loading='lazy'
        decoding='async'
        className='absolute inset-0 w-full h-full object-cover select-none grayscale'
        draggable={false}
      />
      <div className='absolute inset-0 bg-black/45' />
      <div className='relative z-10 flex h-full flex-col items-center justify-center'>
        <h3 className='text-2xl font-medium mb-4 tracking-wide text-primary-300'>{label}</h3>
        <div className='w-[160px] bg-primary-400 px-3 py-1 text-white text-sm font-medium shadow-md'>{content}</div>
      </div>
    </button>
  )
}
