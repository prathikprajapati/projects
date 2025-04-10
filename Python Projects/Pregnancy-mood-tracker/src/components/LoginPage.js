import React from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div>
      <h1>Login Page</h1>
      {/* Add your login form here */}
      <Link to="/register">Register</Link>
      <Link to="/home">Home</Link>
    </div>
  );
}

export default LoginPage;
