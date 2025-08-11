import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'
import ColumnPage from './ColumnPage'
import { Category, ColumnArticle } from '@/types/column'

vi.mock('@/components/ui/columnPage/ColumnCard', () => ({
  ColumnCard: ({ article }: { article: ColumnArticle }) => (
    <div data-testid='column-card' data-article-id={article.id}>
      {article.title}
    </div>
  ),
}))

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
}))

const mockCategories = [
  { key: Category.Column, en: 'RECOMMENDED COLUMN', jp: 'オススメ' },
  { key: Category.Diet, en: 'RECOMMENDED DIET', jp: 'ダイエット' },
  { key: Category.Beauty, en: 'RECOMMENDED BEAUTY', jp: '美容' },
  { key: Category.Health, en: 'RECOMMENDED HEALTH', jp: '健康' },
]

const mockArticles = [
  {
    id: '1',
    category: Category.Column,
    date: '2021.05.17',
    time: '23:25',
    title: 'Test Article 1',
    imageUrl: '/test-image-1.jpg',
    tags: ['tag1', 'tag2'],
  },
  {
    id: '2',
    category: Category.Diet,
    date: '2021.05.18',
    time: '12:30',
    title: 'Test Article 2',
    imageUrl: '/test-image-2.jpg',
    tags: ['tag3'],
  },
]

const defaultProps = {
  categories: mockCategories,
  articles: mockArticles,
  selected: Category.Column,
  isLoading: false,
  isError: false,
  isFetching: false,
  onToggleCategory: vi.fn(),
  onLoadMore: vi.fn(),
}

describe('ColumnPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Category Section', () => {
    it('should render all category buttons with correct text', () => {
      render(<ColumnPage {...defaultProps} />)

      expect(screen.getByText('RECOMMENDED COLUMN')).toBeInTheDocument()
      expect(screen.getByText('オススメ')).toBeInTheDocument()
      expect(screen.getByText('RECOMMENDED DIET')).toBeInTheDocument()
      expect(screen.getByText('ダイエット')).toBeInTheDocument()
      expect(screen.getByText('RECOMMENDED BEAUTY')).toBeInTheDocument()
      expect(screen.getByText('美容')).toBeInTheDocument()
      expect(screen.getByText('RECOMMENDED HEALTH')).toBeInTheDocument()
      expect(screen.getByText('健康')).toBeInTheDocument()
    })

    it('should call onToggleCategory when category button is clicked', () => {
      render(<ColumnPage {...defaultProps} />)

      const columnButton = screen.getByText('RECOMMENDED COLUMN').closest('button')
      fireEvent.click(columnButton!)

      expect(defaultProps.onToggleCategory).toHaveBeenCalledWith(Category.Column)
    })

    it('should render category buttons in responsive grid layout', () => {
      render(<ColumnPage {...defaultProps} />)

      const categoryGrid = screen.getByText('RECOMMENDED COLUMN').closest('div')?.parentElement?.parentElement
      expect(categoryGrid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4')
    })
  })

  describe('Articles Section', () => {
    it('should render all articles using ColumnCard components', () => {
      render(<ColumnPage {...defaultProps} />)

      const columnCards = screen.getAllByTestId('column-card')
      expect(columnCards).toHaveLength(2)
      expect(columnCards[0]).toHaveAttribute('data-article-id', '1')
      expect(columnCards[1]).toHaveAttribute('data-article-id', '2')
    })

    it('should render articles in responsive grid layout', () => {
      render(<ColumnPage {...defaultProps} />)

      const articlesGrid = screen.getAllByTestId('column-card')[0].closest('div')?.parentElement
      expect(articlesGrid).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-4')
    })

    it('should display article titles correctly', () => {
      render(<ColumnPage {...defaultProps} />)

      expect(screen.getByText('Test Article 1')).toBeInTheDocument()
      expect(screen.getByText('Test Article 2')).toBeInTheDocument()
    })
  })

  describe('Loading State', () => {
    it('should show skeleton loading when isLoading is true and no articles', () => {
      render(<ColumnPage {...defaultProps} isLoading={true} articles={[]} />)

      const skeletons = document.querySelectorAll('.animate-pulse')
      expect(skeletons).toHaveLength(8)
    })

    it('should not show skeleton when articles are already loaded', () => {
      render(<ColumnPage {...defaultProps} isLoading={true} articles={mockArticles} />)

      expect(screen.getAllByTestId('column-card')).toHaveLength(2)
      expect(document.querySelectorAll('.animate-pulse')).toHaveLength(0)
    })
  })

  describe('Error State', () => {
    it('should show error message when isError is true', () => {
      render(<ColumnPage {...defaultProps} isError={true} />)

      expect(screen.getByText('データの取得に失敗しました。')).toBeInTheDocument()
    })

    it('should not show articles when error occurs', () => {
      render(<ColumnPage {...defaultProps} isError={true} />)

      expect(screen.queryByTestId('column-card')).not.toBeInTheDocument()
    })
  })

  describe('Load More Button', () => {
    it('should render load more button with correct text', () => {
      render(<ColumnPage {...defaultProps} />)

      expect(screen.getByTestId('load-more-button')).toBeInTheDocument()
      expect(screen.getByText('コラムをもっと見る')).toBeInTheDocument()
    })

    it('should show loading text when isFetching is true', () => {
      render(<ColumnPage {...defaultProps} isFetching={true} />)

      expect(screen.getByText('読み込み中...')).toBeInTheDocument()
    })

    it('should disable button when isFetching is true', () => {
      render(<ColumnPage {...defaultProps} isFetching={true} />)

      const loadMoreButton = screen.getByTestId('load-more-button')
      expect(loadMoreButton).toBeDisabled()
    })

    it('should call onLoadMore when button is clicked', () => {
      render(<ColumnPage {...defaultProps} />)

      const loadMoreButton = screen.getByTestId('load-more-button')
      fireEvent.click(loadMoreButton)

      expect(defaultProps.onLoadMore).toHaveBeenCalledTimes(1)
    })
  })

  describe('Go To Top Button', () => {
    it('should render go to top button', () => {
      render(<ColumnPage {...defaultProps} />)

      expect(screen.getByTestId('go-to-top')).toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('should handle empty articles array gracefully', () => {
      render(<ColumnPage {...defaultProps} articles={[]} />)

      expect(screen.queryByTestId('column-card')).not.toBeInTheDocument()
      expect(screen.getByTestId('load-more-button')).toBeInTheDocument()
    })

    it('should handle undefined categories gracefully', () => {
      render(<ColumnPage {...defaultProps} categories={undefined} />)

      expect(screen.getByTestId('load-more-button')).toBeInTheDocument()
      expect(screen.getByTestId('go-to-top')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper button elements for categories', () => {
      render(<ColumnPage {...defaultProps} />)

      const categoryButtons = screen
        .getAllByRole('button')
        .filter((button) => button.textContent?.includes('RECOMMENDED'))
      expect(categoryButtons).toHaveLength(4)
    })

    it('should have proper button elements for load more and go to top', () => {
      render(<ColumnPage {...defaultProps} />)

      expect(screen.getByRole('button', { name: /コラムをもっと見る/ })).toBeInTheDocument()
      expect(screen.getByTestId('go-to-top')).toBeInTheDocument()
    })
  })
})
