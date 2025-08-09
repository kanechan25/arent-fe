import React from 'react'
import logo from '@/assets/images/logo.svg'
import memo from '@/assets/images/icons/icon_memo.svg'
import challenge from '@/assets/images/icons/icon_challenge.svg'
import info from '@/assets/images/icons/icon_info.svg'
import MobileMenu from '@/components/layout/MobileMenu'
import login from '@/assets/images/icons/icon_login.svg'
import { useNavigate } from 'react-router-dom'
import { Path } from '@/routes/routes'
import { useUserStore } from '@/stores/users'

const Header: React.FC = () => {
  const { isLoggedIn, handleLogin, isLoading } = useUserStore()
  const navigate = useNavigate()
  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate(Path.MyPage)
    } else {
      navigate(Path.ColumnPage)
    }
  }
  return (
    <header className='bg-dark-500 text-light z-10'>
      <div className='relative max-w-[960px] mx-auto flex items-center justify-between p-4'>
        <div onClick={handleLogoClick} className='text-primary-500 text-2xl font-bold cursor-pointer'>
          <img src={logo} alt='logo' className='h-8' />
        </div>
        {isLoggedIn ? (
          <div className='relative flex items-center space-x-10 overflow-visible'>
            <nav className='hidden md:flex items-center space-x-10 mr-24'>
              <button
                onClick={() => navigate(Path.MyRecord)}
                className='flex items-center space-x-2 hover:text-orange-400 transition-colors'
              >
                <img src={memo} alt='memo' className='w-8 h-8' />
                <span>自分の記録</span>
              </button>
              <button className='flex items-center space-x-2 hover:text-orange-400 transition-colors'>
                <img src={challenge} alt='challenge' className='w-8 h-8' />
                <span>チャレンジ</span>
              </button>
              <button className='flex items-center space-x-2  transition-colors relative'>
                <img src={info} alt='info' className='w-8 h-8' />
                <span className='absolute -top-1 left-5 bg-primary-500 text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                  1
                </span>
                <span className='hover:text-orange-400'>お知らせ</span>
              </button>
            </nav>

            <MobileMenu />
          </div>
        ) : (
          <button
            onClick={() => handleLogin(navigate)}
            disabled={isLoading}
            className='text-light hover:text-orange-400 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <img src={login} alt='login' className='w-6 h-6' />
            <span>{isLoading ? 'ログイン中...' : 'ログイン'}</span>
          </button>
        )}
      </div>
    </header>
  )
}

export default Header
