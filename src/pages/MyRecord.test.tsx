import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import MyRecord from './MyRecord'
import { DiaryEntry, TransitionButton } from '@/types/myRecord'

// Mock the child components
vi.mock('@/components/ui/_shared', () => ({
  Button: ({
    children,
    onClick,
    disabled,
  }: {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
  }) => (
    <button data-testid='load-more-button' onClick={onClick} disabled={disabled}>
      {children}
    </button>
  ),
  GoToTop: () => <button data-testid='go-to-top'>Go to top</button>,
  BodyRecord: ({ date, variant }: { date: string; variant?: string }) => (
    <div data-testid='body-record' data-date={date} data-variant={variant}>
      Body Record Component
    </div>
  ),
}))

vi.mock('@/components/ui/myRecord/TransitionBtn', () => ({
  default: ({
    label,
    content,
    icon,
    onClick,
  }: {
    label: string
    content: string
    icon: string
    onClick?: () => void
  }) => (
    <button data-testid='transition-button' data-label={label} data-content={content} onClick={onClick}>
      <div>{label}</div>
      <div>{content}</div>
    </button>
  ),
}))

vi.mock('@/components/ui/myRecord/MyExercise', () => ({
  default: ({ date }: { date: string }) => (
    <div data-testid='my-exercise' data-date={date}>
      My Exercise Component: {date}
    </div>
  ),
}))

vi.mock('@/components/ui/myRecord/DiaryCard', () => ({
  default: ({ entry }: { entry: DiaryEntry }) => (
    <div data-testid='diary-card' data-entry-id={entry.id} data-date={entry.date}>
      <div>
        {entry.date} {entry.time}
      </div>
      <div>{entry.title}</div>
      <div>{entry.content}</div>
    </div>
  ),
}))

// Mock React Suspense
vi.mock('react', async () => {
  const actual = await vi.importActual('react')
  return {
    ...actual,
    Suspense: ({ children }: { children: React.ReactNode }) => <div data-testid='suspense'>{children}</div>,
  }
})

const mockDiaryEntries: DiaryEntry[] = [
  {
    id: '1',
    date: '2025.08.10',
    time: '10:30',
    title: 'Morning Exercise',
    content: 'Had a great workout this morning. Feeling energized and ready for the day ahead.',
  },
  {
    id: '2',
    date: '2025.08.09',
    time: '14:20',
    title: 'Healthy Lunch',
    content: 'Enjoyed a nutritious salad with grilled chicken. Staying committed to my health goals.',
  },
  {
    id: '3',
    date: '2025.08.08',
    time: '20:15',
    title: 'Evening Walk',
    content: 'Took a peaceful walk in the park. Nature always helps me relax and unwind.',
  },
  {
    id: '4',
    date: '2025.08.07',
    time: '16:45',
    title: 'Meditation Session',
    content: 'Spent 20 minutes meditating. Mental health is just as important as physical health.',
  },
]

const mockTransitionButtons: TransitionButton[] = [
  {
    label: 'BODY RECORD',
    content: '自分のカラダの記録',
    icon: '/mock-body-icon.jpg',
    sectionRef: { current: null },
  },
  {
    label: 'MY EXERCISE',
    content: '自分の運動の記録',
    icon: '/mock-exercise-icon.jpg',
    sectionRef: { current: null },
  },
  {
    label: 'MY DIARY',
    content: '自分の日記',
    icon: '/mock-diary-icon.jpg',
    sectionRef: { current: null },
  },
]

const defaultProps = {
  transitionButtons: mockTransitionButtons,
  diaryEntries: mockDiaryEntries,
  isFetching: false,
  bodyRecordRef: { current: null },
  myExerciseRef: { current: null },
  myDiaryRef: { current: null },
  onTransitionClick: vi.fn(),
  onLoadMore: vi.fn(),
}

describe('MyRecord', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Transition Buttons Section', () => {
    it('should render all transition buttons', () => {
      render(<MyRecord {...defaultProps} />)

      expect(screen.getByText('BODY RECORD')).toBeInTheDocument()
      expect(screen.getByText('自分のカラダの記録')).toBeInTheDocument()
      expect(screen.getByText('MY EXERCISE')).toBeInTheDocument()
      expect(screen.getByText('自分の運動の記録')).toBeInTheDocument()
      expect(screen.getAllByText('MY DIARY')).toHaveLength(2)
      expect(screen.getByText('自分の日記')).toBeInTheDocument()
    })

    it('should call onTransitionClick when transition button is clicked', () => {
      render(<MyRecord {...defaultProps} />)

      const transitionButtons = screen.getAllByTestId('transition-button')
      const bodyRecordButton = transitionButtons[0]
      fireEvent.click(bodyRecordButton)

      expect(defaultProps.onTransitionClick).toHaveBeenCalledTimes(1)
    })

    it('should render transition buttons in responsive grid layout', () => {
      render(<MyRecord {...defaultProps} />)

      const transitionButtons = screen.getAllByTestId('transition-button')
      expect(transitionButtons).toHaveLength(3)
      expect(transitionButtons[0]).toHaveAttribute('data-label', 'BODY RECORD')
      expect(transitionButtons[1]).toHaveAttribute('data-label', 'MY EXERCISE')
      expect(transitionButtons[2]).toHaveAttribute('data-label', 'MY DIARY')
    })

    it('should have proper button attributes', () => {
      render(<MyRecord {...defaultProps} />)

      const transitionButtons = screen.getAllByTestId('transition-button')
      transitionButtons.forEach((button) => {
        expect(button).toHaveAttribute('data-label')
        expect(button).toHaveAttribute('data-content')
      })
    })
  })

  describe('Body Record Section', () => {
    it('should render body record component with suspense', () => {
      render(<MyRecord {...defaultProps} />)

      const suspense = screen.getByTestId('suspense')
      expect(suspense).toBeInTheDocument()

      const bodyRecord = screen.getByTestId('body-record')
      expect(bodyRecord).toBeInTheDocument()
      expect(bodyRecord).toHaveAttribute('data-date', '2025/08/10')
      expect(bodyRecord).toHaveAttribute('data-variant', 'full')
    })
  })

  describe('My Exercise Section', () => {
    it('should render my exercise component', () => {
      render(<MyRecord {...defaultProps} />)

      const myExercise = screen.getByTestId('my-exercise')
      expect(myExercise).toBeInTheDocument()
      expect(myExercise).toHaveAttribute('data-date', '2025/08/10')
      expect(screen.getByText('My Exercise Component: 2025/08/10')).toBeInTheDocument()
    })
  })

  describe('My Diary Section', () => {
    it('should render diary section title', () => {
      render(<MyRecord {...defaultProps} />)

      expect(screen.getByRole('heading', { name: 'MY DIARY' })).toBeInTheDocument()
    })

    it('should render all diary cards', () => {
      render(<MyRecord {...defaultProps} />)

      const diaryCards = screen.getAllByTestId('diary-card')
      expect(diaryCards).toHaveLength(4)
      expect(diaryCards[0]).toHaveAttribute('data-entry-id', '1')
      expect(diaryCards[1]).toHaveAttribute('data-entry-id', '2')
      expect(diaryCards[2]).toHaveAttribute('data-entry-id', '3')
      expect(diaryCards[3]).toHaveAttribute('data-entry-id', '4')
    })

    it('should display diary content correctly', () => {
      render(<MyRecord {...defaultProps} />)

      expect(screen.getByText('2025.08.10 10:30')).toBeInTheDocument()
      expect(screen.getByText('Morning Exercise')).toBeInTheDocument()
      expect(
        screen.getByText('Had a great workout this morning. Feeling energized and ready for the day ahead.'),
      ).toBeInTheDocument()

      expect(screen.getByText('2025.08.09 14:20')).toBeInTheDocument()
      expect(screen.getByText('Healthy Lunch')).toBeInTheDocument()
      expect(
        screen.getByText('Enjoyed a nutritious salad with grilled chicken. Staying committed to my health goals.'),
      ).toBeInTheDocument()
    })
  })

  describe('Load More Button', () => {
    it('should render load more button with correct text', () => {
      render(<MyRecord {...defaultProps} />)

      expect(screen.getByTestId('load-more-button')).toBeInTheDocument()
      expect(screen.getByText('自分の日記をもっと見る')).toBeInTheDocument()
    })

    it('should show loading text when isFetching is true', () => {
      render(<MyRecord {...defaultProps} isFetching={true} />)

      expect(screen.getByText('読み込み中...')).toBeInTheDocument()
    })

    it('should disable button when isFetching is true', () => {
      render(<MyRecord {...defaultProps} isFetching={true} />)

      const loadMoreButton = screen.getByTestId('load-more-button')
      expect(loadMoreButton).toBeDisabled()
    })

    it('should call onLoadMore when button is clicked', () => {
      render(<MyRecord {...defaultProps} />)

      const loadMoreButton = screen.getByTestId('load-more-button')
      fireEvent.click(loadMoreButton)

      expect(defaultProps.onLoadMore).toHaveBeenCalledTimes(1)
    })
  })

  describe('Go To Top Button', () => {
    it('should render go to top button', () => {
      render(<MyRecord {...defaultProps} />)

      expect(screen.getByTestId('go-to-top')).toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    it('should integrate all components properly', () => {
      render(<MyRecord {...defaultProps} />)

      // Check all main components are rendered
      expect(screen.getAllByTestId('transition-button')).toHaveLength(3)
      expect(screen.getByTestId('body-record')).toBeInTheDocument()
      expect(screen.getByTestId('my-exercise')).toBeInTheDocument()
      expect(screen.getAllByTestId('diary-card')).toHaveLength(4)
      expect(screen.getByTestId('load-more-button')).toBeInTheDocument()
      expect(screen.getByTestId('go-to-top')).toBeInTheDocument()
    })
  })
})
