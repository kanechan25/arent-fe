import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, ReferenceLine } from 'recharts'
import Button from '@/components/ui/common/Button'
import { useFetchBodyRecord } from '@/hooks/apis/useFetchBodyRecord'
import { typeToLabel, type TimeType } from '@/services/mockData/bodyRecord'

type BodyRecordProps = {
  date: string
  className?: string
  variant?: 'full' | 'compact'
}
const activeButtonStyle = 'bg-[#FFCC21] text-[#2E2E2E] font-bold rounded-[22px] px-6 h-8 shadow-inner'
const normalButtonStyle = 'bg-white/10 text-white rounded-[22px] px-6 h-8'
const timeTypes = ['day', 'week', 'month', 'year'] as TimeType[]

export default function BodyRecord({ className = '', date, variant = 'full' }: BodyRecordProps) {
  const [type, setType] = useState<TimeType>('year')
  const { data = [] } = useFetchBodyRecord(type)

  const sectionStyle = [`w-full ${variant === 'full' ? 'bg-dark-500' : 'bg-dark-600'} p-4 text-light`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <section className={sectionStyle}>
      {variant === 'full' && (
        <header className='flex items-end justify-between gap-4 mb-4 sm:mb-6'>
          <div className='flex items-start gap-4 text-white'>
            <h3 className='text-lg tracking-wide w-[80px] text-left'>BODY RECORD</h3>
            <span className='text-3xl tracking-wide'>{date}</span>
          </div>
        </header>
      )}

      <div className='w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[360px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={data} margin={{ top: 8, right: 8, left: 12, bottom: 0 }}>
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
      </div>

      {variant === 'full' && (
        <div className='mt-6 flex items-center gap-3 sm:gap-4'>
          {timeTypes.map((time) => (
            <Button
              key={time}
              onClick={() => setType(time)}
              className={time === type ? activeButtonStyle : normalButtonStyle}
              ariaLabel={`show ${typeToLabel[time]} view`}
            >
              {typeToLabel[time]}
            </Button>
          ))}
        </div>
      )}
    </section>
  )
}
