import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryProvider } from '@/provider/queryProvider'
import { AuthProvider } from '@/provider/authProvider'
import { routers } from '@/routes/routes'
import Layout from '@/components/layout/Layout'
import './assets/css/App.css'

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
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
      </AuthProvider>
    </QueryProvider>
  )
}

export default App
