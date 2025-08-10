/* eslint-disable @typescript-eslint/no-explicit-any */
export const preloadComponent = (importFn: () => Promise<any>) => {
  importFn()
}

export const preloadPageComponents = {
  columnPage: () => preloadComponent(() => import('@/components/containers/ColumnPageContainer')),
  myPage: () => preloadComponent(() => import('@/components/containers/MyPageContainer')),
  myRecord: () => preloadComponent(() => import('@/components/containers/MyRecordContainer')),
}

export const preloadLibraries = {
  recharts: () => preloadComponent(() => import('recharts')),
  reactWindow: () => preloadComponent(() => import('react-window')),
}
