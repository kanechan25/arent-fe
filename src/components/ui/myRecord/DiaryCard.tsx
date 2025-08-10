import { DiaryEntry } from '@/types/myRecord'

interface DiaryCardProps {
  entry: DiaryEntry
}

export default function DiaryCard({ entry }: DiaryCardProps) {
  return (
    <div className='border-[#707070] border-2 p-4 h-58 w-58 flex flex-col text-left'>
      <div className='text-lg mb-2 flex flex-col'>
        <span>{entry.date}</span>
        <span>{entry.time}</span>
      </div>
      <div className='flex-1'>
        <h4 className='text-xs mb-2'>{entry.title}</h4>
        <p className='text-xs leading-relaxed'>{entry.content}</p>
      </div>
    </div>
  )
}
