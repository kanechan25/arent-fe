import React from 'react'

const Footer: React.FC = () => {
  const footerLinks = [
    '会社概要',
    '運営会社',
    '利用規約',
    '個人情報保護方針について',
    '特定商取引法に基づく表記',
    'お問い合わせ',
  ]

  return (
    <footer className='bg-dark-500 text-white'>
      <div className='max-w-[960px] mx-auto px-4 py-14'>
        <div className='flex flex-wrap justify-center md:justify-start space-x-8 '>
          {footerLinks.map((link, index) => (
            <button key={index} className='text-gray-300 hover:text-white transition-colors text-xs'>
              {link}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
