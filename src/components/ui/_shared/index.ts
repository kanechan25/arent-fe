// Lazy load shared components to reduce initial bundle size
import { lazy } from 'react'

export const BodyRecord = lazy(() => import('./BodyRecord'))
export const Button = lazy(() => import('./Button'))
export const GoToTop = lazy(() => import('./GoToTop'))

// Export default components for backward compatibility
export { default as BodyRecordDefault } from './BodyRecord'
export { default as ButtonDefault } from './Button'
export { default as GoToTopDefault } from './GoToTop'
