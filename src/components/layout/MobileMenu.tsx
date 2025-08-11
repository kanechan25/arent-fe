/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from 'react'
import menu from '@/assets/images/icons/icon_menu.svg'
import close from '@/assets/images/icons/icon_close.svg'
import logout from '@/assets/images/icons/icon_logout.svg'
import { useNavigate } from 'react-router-dom'
import { Path } from '@/routes/routes'
import { useUserStore } from '@/stores/users'

interface MobileMenuItems {
  label: string
  action: () => void
  icon?: string
}

const MobileMenu: React.FC = () => {
  const { handleLogout } = useUserStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleToggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)
  const navigate = useNavigate()
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeMenu()
    }
  }
  const menuItems: MobileMenuItems[] = useMemo(
    () => [
      { label: '自分の記録', action: () => navigate(Path.MyRecord) },
      { label: '体重グラフ', action: () => console.log('体重グラフ') },
      { label: '目標', action: () => console.log('目標') },
      { label: '選択中のコース', action: () => console.log('選択中のコース') },
      { label: 'コラム一覧', action: () => navigate(Path.ColumnPage) },
      { label: '設定', action: () => console.log('設定') },
      {
        label: 'ログアウト',
        action: async () => await handleLogout(navigate),
        icon: logout,
      },
    ],
    [],
  )

  return (
    <>
      {isOpen && <div className='fixed inset-0 bg-dard-500 bg-opacity-50 z-10' onClick={handleOverlayClick} />}
      <div className='absolute right-0 top-0 z-10'>
        <div className='flex flex-col h-full'>
          <div className='flex justify-end'>
            <button onClick={handleToggleMenu} className='text-orange-500 hover:text-orange-400 transition-colors'>
              <img src={isOpen ? close : menu} alt={isOpen ? 'close' : 'menu'} className='w-8 h-8' />
            </button>
          </div>
          {isOpen && (
            <div className='bg-gray-400 flex-1 mt-1'>
              {menuItems.map((item, index) => (
                <div key={index} className='py-5 px-8 w-[280px] border-b  border-gray-600 last:border-b-0'>
                  <button
                    onClick={() => {
                      item.action()
                      closeMenu()
                    }}
                    className=' text-xl font-medium flex items-center justify-between text-white hover:text-orange-400 transition-colors w-full text-left'
                  >
                    {item.label}
                    {item.icon && <img src={item.icon} alt={item.label} className='w-6 h-6' />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default MobileMenu
