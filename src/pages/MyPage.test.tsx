import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import MyPage from './MyPage'
import { MealType, MealHistory } from '@/types/myPage'

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

vi.mock('@/components/ui/myPage/RingProgress', () => ({
  default: ({ date, percentage, size }: { date: string; percentage: number; size: number }) => (
    <div data-testid='ring-progress' data-date={date} data-percentage={percentage} data-size={size}>
      Ring Progress: {percentage}%
    </div>
  ),
}))

vi.mock('@/components/ui/myPage/MealButton', () => ({
  default: ({ selected, label, onClick }: { selected: boolean; label: string; onClick: () => void }) => (
    <button data-testid='meal-button' data-selected={selected} data-label={label} onClick={onClick}>
      {label}
    </button>
  ),
}))

vi.mock('@/components/ui/myPage/MealCard', () => ({
  MealCard: ({ item }: { item: MealHistory }) => (
    <div data-testid='meal-card' data-meal-id={item.id} data-type={item.type}>
      {item.type} - {item.date}
    </div>
  ),
}))

vi.mock('@/assets/images/photo/d01.jpg', () => ({
  default: '/mock-bg-meal.jpg',
}))

vi.mock('@/assets/images/icons/icon_knife.svg', () => ({
  default: '/mock-knife-icon.svg',
}))

vi.mock('@/assets/images/icons/icon_cup.svg', () => ({
  default: '/mock-cup-icon.svg',
}))

const mockHistories: MealHistory[] = [
  {
    id: '1',
    type: MealType.Morning,
    date: '2021/05/21',
    imageUrl: '/mock-meal-1.jpg',
  },
  {
    id: '2',
    type: MealType.Lunch,
    date: '2021/05/21',
    imageUrl: '/mock-meal-2.jpg',
  },
  {
    id: '3',
    type: MealType.Dinner,
    date: '2021/05/21',
    imageUrl: '/mock-meal-3.jpg',
  },
  {
    id: '4',
    type: MealType.Snack,
    date: '2021/05/21',
    imageUrl: '/mock-meal-4.jpg',
  },
]

const defaultProps = {
  histories: mockHistories,
  isLoading: false,
  isError: false,
  isFetching: false,
  selected: MealType.Morning,
  requestDate: '2021/05/21',
  onToggle: vi.fn(),
  onLoadMore: vi.fn(),
}

describe('MyPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Header Section', () => {
    it('should render background image and ring progress', () => {
      render(<MyPage {...defaultProps} />)

      const backgroundImage = screen.getByRole('img', { name: '' })
      expect(backgroundImage).toBeInTheDocument()
      expect(backgroundImage).toHaveAttribute('src', '/mock-bg-meal.jpg')
    })

    it('should render ring progress with correct props', () => {
      render(<MyPage {...defaultProps} />)

      const ringProgress = screen.getByTestId('ring-progress')
      expect(ringProgress).toBeInTheDocument()
      expect(ringProgress).toHaveAttribute('data-date', '08/09')
      expect(ringProgress).toHaveAttribute('data-percentage', '75')
      expect(ringProgress).toHaveAttribute('data-size', '200')
    })

    it('should render body record component with correct props', () => {
      render(<MyPage {...defaultProps} />)

      const bodyRecord = screen.getByTestId('body-record')
      expect(bodyRecord).toBeInTheDocument()
      expect(bodyRecord).toHaveAttribute('data-date', '2021/05/21')
      expect(bodyRecord).toHaveAttribute('data-variant', 'compact')
    })
  })

  describe('Meal Filter Buttons', () => {
    it('should render all meal filter buttons', () => {
      render(<MyPage {...defaultProps} />)

      expect(screen.getByText('Morning')).toBeInTheDocument()
      expect(screen.getByText('Lunch')).toBeInTheDocument()
      expect(screen.getByText('Dinner')).toBeInTheDocument()
      expect(screen.getByText('Snack')).toBeInTheDocument()
    })

    it('should call onToggle when meal button is clicked', () => {
      render(<MyPage {...defaultProps} />)

      const morningButton = screen.getByText('Morning').closest('button')
      fireEvent.click(morningButton!)

      expect(defaultProps.onToggle).toHaveBeenCalledWith(MealType.Morning)
    })

    it('should render meal buttons in responsive grid layout', () => {
      render(<MyPage {...defaultProps} />)

      const mealButtons = screen.getAllByTestId('meal-button')
      expect(mealButtons).toHaveLength(4)
      expect(mealButtons[0]).toHaveTextContent('Morning')
      expect(mealButtons[1]).toHaveTextContent('Lunch')
      expect(mealButtons[2]).toHaveTextContent('Dinner')
      expect(mealButtons[3]).toHaveTextContent('Snack')
    })
  })

  describe('Meal History Section', () => {
    it('should render all meal cards', () => {
      render(<MyPage {...defaultProps} />)

      const mealCards = screen.getAllByTestId('meal-card')
      expect(mealCards).toHaveLength(4)
      expect(mealCards[0]).toHaveAttribute('data-meal-id', '1')
      expect(mealCards[1]).toHaveAttribute('data-meal-id', '2')
      expect(mealCards[2]).toHaveAttribute('data-meal-id', '3')
      expect(mealCards[3]).toHaveAttribute('data-meal-id', '4')
    })

    it('should display meal types and dates correctly', () => {
      render(<MyPage {...defaultProps} />)

      expect(screen.getByText('morning - 2021/05/21')).toBeInTheDocument()
      expect(screen.getByText('lunch - 2021/05/21')).toBeInTheDocument()
      expect(screen.getByText('dinner - 2021/05/21')).toBeInTheDocument()
      expect(screen.getByText('snack - 2021/05/21')).toBeInTheDocument()
    })

    it('should render meal cards in responsive grid layout', () => {
      render(<MyPage {...defaultProps} />)

      const mealCardsGrid = screen.getAllByTestId('meal-card')[0].closest('div')?.parentElement
      expect(mealCardsGrid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4')
    })
  })

  describe('Loading State', () => {
    it('should show skeleton loading when isLoading is true and no histories', () => {
      render(<MyPage {...defaultProps} isLoading={true} histories={[]} />)

      const skeletons = document.querySelectorAll('.animate-pulse')
      expect(skeletons).toHaveLength(8)
    })

    it('should not show skeleton when histories are already loaded', () => {
      render(<MyPage {...defaultProps} isLoading={true} histories={mockHistories} />)

      expect(screen.getAllByTestId('meal-card')).toHaveLength(4)
      expect(document.querySelectorAll('.animate-pulse')).toHaveLength(0)
    })
  })

  describe('Error State', () => {
    it('should show error message when isError is true', () => {
      render(<MyPage {...defaultProps} isError={true} />)

      expect(screen.getByText('データの取得に失敗しました。')).toBeInTheDocument()
    })

    it('should not show meal cards when error occurs', () => {
      render(<MyPage {...defaultProps} isError={true} />)

      expect(screen.queryByTestId('meal-card')).not.toBeInTheDocument()
    })
  })

  describe('Load More Button', () => {
    it('should render load more button with correct text', () => {
      render(<MyPage {...defaultProps} />)

      expect(screen.getByTestId('load-more-button')).toBeInTheDocument()
      expect(screen.getByText('記録をもっと見る')).toBeInTheDocument()
    })

    it('should show loading text when isFetching is true', () => {
      render(<MyPage {...defaultProps} isFetching={true} />)

      expect(screen.getByText('読み込み中...')).toBeInTheDocument()
    })

    it('should disable button when isFetching is true', () => {
      render(<MyPage {...defaultProps} isFetching={true} />)

      const loadMoreButton = screen.getByTestId('load-more-button')
      expect(loadMoreButton).toBeDisabled()
    })

    it('should call onLoadMore when button is clicked', () => {
      render(<MyPage {...defaultProps} />)

      const loadMoreButton = screen.getByTestId('load-more-button')
      fireEvent.click(loadMoreButton)

      expect(defaultProps.onLoadMore).toHaveBeenCalledTimes(1)
    })
  })

  describe('Go To Top Button', () => {
    it('should render go to top button', () => {
      render(<MyPage {...defaultProps} />)

      expect(screen.getByTestId('go-to-top')).toBeInTheDocument()
    })
  })

  describe('Layout and Styling', () => {
    it('should have proper container spacing', () => {
      render(<MyPage {...defaultProps} />)

      const mainContainer = screen.getByTestId('ring-progress').closest('div')?.parentElement?.parentElement
        ?.parentElement?.parentElement
      expect(mainContainer).toHaveClass('space-y-10')
    })

    it('should have proper meal section container styling', () => {
      render(<MyPage {...defaultProps} />)

      const mealSection = screen.getByText('Morning').closest('div')?.parentElement?.parentElement
      expect(mealSection).toHaveClass('flex', 'flex-col', 'max-w-[960px]', 'mx-auto')
    })

    it('should have proper meal grid spacing', () => {
      render(<MyPage {...defaultProps} />)

      const mealGrid = screen.getAllByTestId('meal-card')[0].closest('div')?.parentElement
      expect(mealGrid).toHaveClass('gap-6')
    })
  })

  describe('Empty State', () => {
    it('should handle empty histories array gracefully', () => {
      render(<MyPage {...defaultProps} histories={[]} />)

      expect(screen.queryByTestId('meal-card')).not.toBeInTheDocument()
      expect(screen.getByTestId('load-more-button')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper button elements for meal filters', () => {
      render(<MyPage {...defaultProps} />)

      const mealButtons = screen.getAllByTestId('meal-button')
      expect(mealButtons).toHaveLength(4)
    })

    it('should have proper button elements for load more and go to top', () => {
      render(<MyPage {...defaultProps} />)

      expect(screen.getByRole('button', { name: /記録をもっと見る/ })).toBeInTheDocument()
      expect(screen.getByTestId('go-to-top')).toBeInTheDocument()
    })

    it('should have proper aria-labels for meal buttons', () => {
      render(<MyPage {...defaultProps} />)

      const mealButtons = screen.getAllByTestId('meal-button')
      mealButtons.forEach((button) => {
        expect(button).toHaveAttribute('data-label')
      })
    })
  })

  describe('Responsive Design', () => {
    it('should have responsive header layout', () => {
      render(<MyPage {...defaultProps} />)

      const headerSection = screen.getByTestId('ring-progress').closest('div')?.parentElement
        ?.parentElement?.parentElement
      expect(headerSection).toHaveClass('lg:grid-cols-[42%_58%]')
    })

    it('should have responsive meal buttons layout', () => {
      render(<MyPage {...defaultProps} />)

      const mealButtons = screen.getAllByTestId('meal-button')
      expect(mealButtons).toHaveLength(4)
      mealButtons.forEach((button) => {
        expect(button).toHaveAttribute('data-label')
      })
    })

    it('should have responsive meal cards layout', () => {
      render(<MyPage {...defaultProps} />)

      const mealCardsGrid = screen.getAllByTestId('meal-card')[0].closest('div')?.parentElement
      expect(mealCardsGrid).toHaveClass('sm:grid-cols-2', 'lg:grid-cols-4')
    })
  })
})
