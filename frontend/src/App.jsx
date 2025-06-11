import './styles/styles.css';
import Header from './_components/Header.jsx';
import Footer from './_components/Footer.jsx';
import Body from './_components/Body.jsx';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import EmployeeLogin from './pages/EmployeeLogin.jsx';
import HrLogin from './pages/HrLogin.jsx';
import EmployeeRegister from './pages/EmployeeRegister.jsx';

function AppRoutes() {
  const location = useLocation();
  const fullPageRoutes = ["/login/employee", "/login/hr", "/register/employee"];

  const isFullPage = fullPageRoutes.includes(location.pathname);

  return (
    <>
      {!isFullPage && <Header />}

      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/login/employee" element={<EmployeeLogin />} />
        <Route path="/login/hr" element={<HrLogin />} />
        <Route path="/register/employee" element={<EmployeeRegister />} />
      </Routes>

      {!isFullPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
