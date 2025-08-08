import Home from '@/pages/Home'
import MyPage from '@/pages/MyPage'
import MyRecord from '@/pages/MyRecord'

export enum Path {
  Home = '/',
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
    href: Path.Home,
    id: 'home',
    name: 'Home',
    element: <Home />,
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
