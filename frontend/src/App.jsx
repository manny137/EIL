import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './_components/Header';
import Footer from './_components/Footer';
import Body from './_components/Body';

import HRLogin from './pages/HrLogin';
import HrDashboard from './pages/HRDashboard';
import EmployeeLogin from './pages/EmployeeLogin';
import EmployeeRegister from './pages/EmployeeRegister';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Profile from './pages/EmployeeProfile';
import LeaveForm from './pages/LeaveForm';
import LeaveHistory from './pages/LeaveHistory';
import BankDetails from './pages/BankDetails';

import ProtectedRoute from './_components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const location = useLocation();

  const fullPageRoutes = [
    '/login/hr',
    '/login/employee',
    '/register/employee',
    '/hr/dashboard',
    '/employee/dashboard',
    '/employee/profile',
    '/employee/leave',
    '/employee/leaves/view',
    '/employee/bank'
  ];

  const isFullPage = fullPageRoutes.some(route =>
    location.pathname.toLowerCase().startsWith(route)
  );

  return (
    <>
      {!isFullPage && <Header />}

      <Routes>
        <Route path="/" element={<Body />} />

        {/* Auth Pages */}
        <Route path="/login/hr" element={<HRLogin />} />
        <Route path="/login/employee" element={<EmployeeLogin />} />
        <Route path="/register/employee" element={<EmployeeRegister />} />

        {/* Protected HR Route */}
        <Route
          path="/hr/dashboard"
          element={
            <ProtectedRoute role="hr">
              <HrDashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Employee Routes */}
        <Route
          path="/employee/dashboard"
          element={
            <ProtectedRoute role="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/profile"
          element={
            <ProtectedRoute role="employee">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/leave"
          element={
            <ProtectedRoute role="employee">
              <LeaveForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/leaves/view"
          element={
            <ProtectedRoute role="employee">
              <LeaveHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employee/bank"
          element={
            <ProtectedRoute role="employee">
              <BankDetails />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isFullPage && <Footer />}
    </>
  );
}

export default App;
