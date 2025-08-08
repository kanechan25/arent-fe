import React from 'react'
import menu from '@/assets/images/icons/icon_menu.svg'
import logo from '@/assets/images/logo.svg'
import memo from '@/assets/images/icons/icon_memo.svg'
import challenge from '@/assets/images/icons/icon_challenge.svg'
import info from '@/assets/images/icons/icon_info.svg'

const Header: React.FC = () => {
  return (
    <header className='bg-dark-500 text-light'>
      <div className='max-w-[960px] mx-auto flex items-center justify-between p-4'>
        <div className='text-primary-500 text-2xl font-bold'>
          <img src={logo} alt='logo' className='h-8' />
        </div>

        <nav className='hidden md:flex items-center space-x-10'>
          <button className='flex items-center space-x-2 hover:text-orange-400 transition-colors'>
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
          <button className=' text-orange-500 hover:text-orange-400 transition-colors'>
            <img src={menu} alt='menu' className='w-8 h-8' />
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header
