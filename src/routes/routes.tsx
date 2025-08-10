import { MyPageContainer, ColumnPageContainer, MyRecordContainer } from '@/components/containers'

export enum Path {
  ColumnPage = '/',
  MyPage = '/my-page',
  MyRecord = '/my-record',
}

export type Routes = {
  href: string
  id: string
  name: string
  element: React.ReactNode
}

export const routers: Routes[] = [
  {
    href: Path.ColumnPage,
    id: 'column-page',
    name: 'Column Page',
    element: <ColumnPageContainer />,
  },
  {
    href: Path.MyPage,
    id: 'my-page',
    name: 'My Page',
    element: <MyPageContainer />,
  },
  {
    href: Path.MyRecord,
    id: 'my-record',
    name: 'My Record',
    element: <MyRecordContainer />,
  },

  // Add other routes as needed
]
