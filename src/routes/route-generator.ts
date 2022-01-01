import lazy from 'react-lazy-with-preload'
import { routes } from './routes'

export const RoutesData = [
  {
    title: 'Index',
    path: routes.index,
    component: lazy(() => import('pages/index')),
  },
]
