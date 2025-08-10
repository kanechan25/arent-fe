import { lazy } from 'react'

export const BodyRecord = lazy(() => import('./BodyRecord'))
export const Button = lazy(() => import('./Button'))
export const GoToTop = lazy(() => import('./GoToTop'))

export { default as BodyRecordDefault } from './BodyRecord'
export { default as ButtonDefault } from './Button'
export { default as GoToTopDefault } from './GoToTop'
