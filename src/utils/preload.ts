/* eslint-disable @typescript-eslint/no-explicit-any */
export const preloadComponent = (importFn: () => Promise<any>) => {
  importFn()
}

export const preloadPageComponents = {
  columnPage: () => preloadComponent(() => import('@/pages/ColumnPage')),
  myPage: () => preloadComponent(() => import('@/pages/MyPage')),
  myRecord: () => preloadComponent(() => import('@/pages/MyRecord')),
}

export const preloadLibraries = {
  recharts: () => preloadComponent(() => import('recharts')),
  reactWindow: () => preloadComponent(() => import('react-window')),
}

export const preloadOnHover = (preloadFn: () => void) => {
  let timeoutId: NodeJS.Timeout | null = null

  return {
    onMouseEnter: () => {
      timeoutId = setTimeout(preloadFn, 100)
    },
    onMouseLeave: () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
        timeoutId = null
      }
    },
  }
}
