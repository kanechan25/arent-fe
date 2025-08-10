import { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.props.onError?.(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className='flex items-center justify-center p-8 bg-red-50 border border-red-200 rounded-lg'>
            <div className='text-center'>
              <h3 className='text-lg font-semibold text-red-800 mb-2'>エラーが発生しました</h3>
              <p className='text-sm text-red-600 mb-4'>申し訳ございませんが、問題が発生しました。</p>
              <button
                onClick={() => this.setState({ hasError: false })}
                className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'
              >
                再試行
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
