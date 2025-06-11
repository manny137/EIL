import './styles/styles.css';
import Header from './_components/Header.jsx';
import Footer from './_components/Footer.jsx';
import Body from './_components/Body.jsx';

import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import EmployeeLogin from './pages/employeeLogin.jsx';
import HrLogin from './pages/hrLogin.jsx';
import EmployeeRegister from './pages/employeeRegister.jsx';

function AppRoutes() {
  const location = useLocation();

  // Only allow these full-page routes
  const fullPageRoutes = [
    "/login/employee",
    "/login/hr",
    "/register/employee"
  ];

  // Redirect to lowercase version if path is not lowercase
  const lowerCasePath = location.pathname.toLowerCase();
  if (location.pathname !== lowerCasePath) {
    return <Navigate to={lowerCasePath} replace />;
  }

  const isFullPage = fullPageRoutes.includes(lowerCasePath);

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
