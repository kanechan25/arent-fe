type ProgressProps = {
  date: string // 'MM/DD'
  percentage: number
}

export default function RingProgress({ date, percentage }: ProgressProps) {
  const size = 220
  const stroke = 8
  const radius = size / 2 - stroke
  const c = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(100, percentage))
  const draw = (c * pct) / 100
  const rest = c - draw

  return (
    <div className='relative inline-flex items-center justify-center' style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className='-rotate-90'>
        <defs>
          <filter id='glow' x='-50%' y='-50%' width='200%' height='200%'>
            <feGaussianBlur stdDeviation='4' result='blur' />
            <feMerge>
              <feMergeNode in='blur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='#FF8A00'
          strokeWidth={stroke + 2}
          strokeDasharray={`${draw} ${rest}`}
          strokeLinecap='round'
          filter='url(#glow)'
          opacity={0.6}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill='none'
          stroke='#FFFFFF'
          strokeWidth={stroke}
          strokeDasharray={`${draw} ${rest}`}
          strokeLinecap='round'
        />
      </svg>

      <div className='absolute inset-0 grid place-items-center'>
        <div className='text-center leading-tight'>
          <div className='text-white font-medium flex items-end gap-2 [text-shadow:0_0_10px_rgba(255,138,0,.8)]'>
            <span className='text-xl'>{date}</span>
            <span className='text-4xl align-middle [text-shadow:0_0_12px_rgba(255,138,0,.9)]'>{pct}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
