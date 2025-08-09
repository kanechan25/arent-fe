import ColumnPage from '@/pages/ColumnPage'
import MyPage from '@/pages/MyPage'
import MyRecord from '@/pages/MyRecord'

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
    element: <ColumnPage />,
  },
  {
    href: Path.MyPage,
    id: 'my-page',
    name: 'My Page',
    element: <MyPage />,
  },
  {
    href: Path.MyRecord,
    id: 'my-record',
    name: 'My Record',
    element: <MyRecord />,
  },

  // Add other routes as needed
]
