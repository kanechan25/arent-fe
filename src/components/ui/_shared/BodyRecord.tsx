import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, ReferenceLine } from 'recharts'
import Button from '@/components/ui/_shared/Button'
import { useFetchBodyRecord } from '@/hooks/apis/useFetchBodyRecord'
import { TypeToLabel, TimeType } from '@/types/myRecord'

type BodyRecordProps = {
  date: string // 'YYYY/MM/DD'
  className?: string
  variant?: 'full' | 'compact'
}
const activeButtonStyle = 'bg-primary-300 text-light font-bold rounded-[22px] px-6 h-7 shadow-inner'
const normalButtonStyle = 'bg-light text-primary-300 rounded-[22px] px-6 h-7'
const timeTypes = ['day', 'week', 'month', 'year'] as TimeType[]

export default function BodyRecord({ className = '', date, variant = 'full' }: BodyRecordProps) {
  const [type, setType] = useState<TimeType>('year')
  const { data = [] } = useFetchBodyRecord(type)

  const sectionStyle = [`w-full ${variant === 'full' ? 'bg-dark-500' : 'bg-dark-600'} py-4 px-6 text-light`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={sectionStyle}>
      <div className={`w-full h-full ${variant === 'full' ? 'pb-24' : ''}`}>
        {variant === 'full' && (
          <header className='flex items-end justify-between gap-4'>
            <div className='flex items-start gap-4 text-white'>
              <h3 className='text-md tracking-wide w-[80px] text-left'>BODY RECORD</h3>
              <span className='text-2xl tracking-wide'>{date}</span>
            </div>
          </header>
        )}

        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data} margin={{ top: 8, right: 8, left: 14, bottom: 0 }}>
            <CartesianGrid vertical={false} horizontal={false} />
            <XAxis
              dataKey='label'
              tick={{ fill: '#fff' }}
              axisLine={false}
              tickLine={false}
              interval={0}
              padding={{ left: 10, right: 10 }}
              minTickGap={0}
              allowDuplicatedCategory={false}
            />
            <YAxis hide domain={['auto', 'auto']} />
            {data.map((d) => (
              <ReferenceLine key={`v-${d.label}`} x={d.label} stroke='#777' strokeOpacity={0.4} />
            ))}
            <Tooltip
              contentStyle={{ backgroundColor: '#2E2E2E', border: '1px solid #555' }}
              labelStyle={{ color: '#fff' }}
              itemStyle={{ color: '#fff' }}
              separator=''
              labelFormatter={() => ''}
              formatter={(value: number) => [String(value), '']}
            />
            <Line
              type='linear'
              dataKey='weight'
              stroke='#8FE9D0'
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
            <Line
              type='linear'
              dataKey='bodyFat'
              stroke='#FFCC21'
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>

        {variant === 'full' && (
          <div className='mt-2 bg-dark-500 flex items-center gap-3 sm:gap-4'>
            {timeTypes.map((time) => (
              <Button
                key={time}
                onClick={() => setType(time)}
                className={time === type ? activeButtonStyle : normalButtonStyle}
                ariaLabel={`show ${TypeToLabel[time]} view`}
              >
                {TypeToLabel[time]}
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
