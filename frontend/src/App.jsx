import AppRouter from './router/AppRouter'
import { useLogout } from './hooks/useLogout'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
    </>
  )
}

export default App
