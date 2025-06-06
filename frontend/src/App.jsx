import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/styles.css'
import LoginDialog from './pages/LoginPage.jsx'
import Header from './_components/Header.jsx'
import Footer from './_components/Footer.jsx'
import Body from './_components/Body.jsx'

function App() {
  return (
    <>
      <div>

          <Header />
          <Body />
          <Footer/>
        </div>
    </>
  );
}

export default App;
