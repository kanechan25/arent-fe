import React from 'react'

interface FooterLinks {
  label: string
  href: string
}

const Footer: React.FC = () => {
  const footerLinks: FooterLinks[] = [
    { label: '会社概要', href: '#' },
    { label: '運営会社', href: '#' },
    { label: '利用規約', href: '#' },
    { label: '個人情報保護方針について', href: '#' },
    { label: '特定商取引法に基づく表記', href: '#' },
    { label: 'お問い合わせ', href: '#' },
  ]

  return (
    <footer className='bg-dark-500 text-white'>
      <div className='max-w-[960px] mx-auto px-4 py-14'>
        <div className='flex flex-wrap justify-center md:justify-start space-x-8 '>
          {footerLinks.map((link, index) => (
            <button key={index} className='text-light hover:text-orange-400 transition-colors text-xs'>
              {link?.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
