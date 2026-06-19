
import { useEffect } from 'react'
import './App.css'
import Login from './pages/Login'
import AppRoutes from './routes/appRoutes'
import { validateUser } from './services/authService'

function App() {
  useEffect(() => {
    // validateUser()
  }, [])
  return (
    <AppRoutes />
  )
}

export default App
