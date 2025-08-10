import { useMyPage } from '@/hooks/useMyPage'
import { MyPage } from '@/pages'

const MyPageContainer: React.FC = () => {
  const { filteredHistories, selected, isLoading, isError, isFetching, requestDate, onToggle, onLoadMore } = useMyPage()

  return (
    <MyPage
      histories={filteredHistories || []}
      isLoading={isLoading}
      isError={isError}
      isFetching={isFetching}
      selected={selected}
      requestDate={requestDate}
      onToggle={onToggle}
      onLoadMore={onLoadMore}
    />
  )
}
export default MyPageContainer
