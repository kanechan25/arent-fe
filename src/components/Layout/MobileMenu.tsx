import React from 'react'
import menu from '@/assets/images/icons/icon_menu.svg'
import close from '@/assets/images/icons/icon_close.svg'
import { useMobileMenuStore } from '@/stores/mobileMenu'
import logout from '@/assets/images/icons/icon_logout.svg'
import { useNavigate } from 'react-router-dom'
import { Path } from '@/routes/routes'
import { useUserStore } from '@/stores/users'
interface MobileMenuItems {
  id: number
  label: string
  onClick: () => void
}

const MobileMenu: React.FC = () => {
  const { isOpen, closeMenu, toggleMenu } = useMobileMenuStore()
  const { handleLogout } = useUserStore()
  const navigate = useNavigate()

  const handleMenuItemClick = async (id: number) => {
    try {
      switch (id) {
        case 1:
          navigate(Path.MyRecord)
          break
        case 2:
          console.log('体重グラフ')
          break
        case 3:
          console.log('目標')
          break
        case 4:
          console.log('選択中のコース')
          break
        case 5:
          navigate(Path.Home)
          break
        case 6:
          console.log('設定')
          break
        case 7:
          await handleLogout(navigate)
          break
      }
    } catch (error) {
      console.error('Menu action error:', error)
    } finally {
      closeMenu()
    }
  }

  const menuItems: MobileMenuItems[] = [
    { id: 1, label: '自分の記録', onClick: () => handleMenuItemClick(1) },
    { id: 2, label: '体重グラフ', onClick: () => handleMenuItemClick(2) },
    { id: 3, label: '目標', onClick: () => handleMenuItemClick(3) },
    { id: 4, label: '選択中のコース', onClick: () => handleMenuItemClick(4) },
    { id: 5, label: 'コラム一覧', onClick: () => handleMenuItemClick(5) },
    { id: 6, label: '設定', onClick: () => handleMenuItemClick(6) },
    { id: 7, label: 'ログアウト', onClick: () => handleMenuItemClick(7) },
  ]

  return (
    <div className='absolute right-0 top-0 z-10'>
      <div className='flex flex-col h-full'>
        <div className='flex justify-end'>
          <button onClick={toggleMenu} className='text-orange-500 hover:text-orange-400 transition-colors'>
            <img src={isOpen ? close : menu} alt={isOpen ? 'close' : 'menu'} className='w-8 h-8' />
          </button>
        </div>
        {isOpen && (
          <div className='bg-gray-400 flex-1 mt-1'>
            {menuItems.map((item, index) => (
              <div key={index} className='py-5.5 px-8 w-[280px] border-b  border-gray-600 last:border-b-0'>
                <button
                  onClick={() => item.onClick()}
                  className=' text-xl font-medium flex items-center justify-between text-white hover:text-orange-400 transition-colors w-full text-left'
                >
                  {item.label}
                  {item.id === 7 && <img src={logout} alt='logout' className='w-6 h-6' />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileMenu
