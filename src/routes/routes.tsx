import { Routes } from '@/models/types'
import Home from '@/pages/Home'
import MyPage from '@/pages/MyPage'
import MyRecord from '@/pages/MyRecord'

export const routers: Routes[] = [
  {
    href: '/',
    id: 'home',
    name: 'Home',
    element: <Home />,
  },
  {
    href: '/my-page',
    id: 'my-page',
    name: 'My Page',
    element: <MyPage />,
  },
  {
    href: '/my-record',
    id: 'my-record',
    name: 'My Record',
    element: <MyRecord />,
  },

  // Add other routes as needed
]
