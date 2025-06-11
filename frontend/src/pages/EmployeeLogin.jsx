import { Link } from "react-router-dom";

export default function EmployeeLogin() {
  return (
    <div className="login-page">
      <h2>Employee Login</h2>
      <form>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
      <p>
        New here? <Link to="/register/employee">Register new employee</Link>
      </p>
    </div>
  );
}
