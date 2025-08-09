import BodyRecord from '@/components/ui/BodyRecord'
import RingProgress from '@/components/ui/RingProgress'

const MyPage = () => {
  return (
    <div className='space-y-8'>
      <div className='text-dark-500 flex'>
        <RingProgress date='08/09' percentage={75} />
        <BodyRecord date='2025/08/09' variant='compact' />
      </div>
    </div>
  )
}

export default MyPage
