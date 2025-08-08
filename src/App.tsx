import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CounterStoreProvider } from '@/provider/counterProvider'
import { QueryProvider } from '@/provider/queryProvider'
import { routers } from '@/routes/routes'
import Layout from '@/components/Layout/Layout'
import './assets/css/App.css'

function App() {
  return (
    <QueryProvider>
      <CounterStoreProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route>
                {routers.map((route) => (
                  <Route key={route.id} path={route.href} element={route.element} />
                ))}
                <Route path='*' element={<Navigate to='/' replace />} />
              </Route>
            </Routes>
          </Layout>
        </BrowserRouter>
      </CounterStoreProvider>
    </QueryProvider>
  )
}

export default App
