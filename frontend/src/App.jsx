import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/styles.css'
import LoginDialog from './pages/LoginPage.jsx'

function App() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <LoginDialog />
        </div>
      </div>
    </>
  )
}

export default App
