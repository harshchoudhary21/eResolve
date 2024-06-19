import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  // State for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form input changes
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Make HTTP POST request to login endpoint
      const response = await axios.post('http://localhost:5000/api/v1/login', { email, password });
      console.log('Login successful:', response.data);
      // Redirect or update UI accordingly
    } catch (error) {
      console.error('Login error:', error.response.data);
      // Handle errors (e.g., show error message)
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login Page</h2>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="form-input" placeholder="name@company.com" required value={email} onChange={handleEmailChange} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" className="form-input" placeholder="••••••••" required value={password} onChange={handlePasswordChange} />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="form-checkbox" />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-white">Remember me</label>
                  </div>
                  <div className="forgot">
                    <Link to="/forgot-password" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot your password?</Link>
                  </div>
                </div>
                <div>
                  <button type="submit" className="login-button">Log in</button>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;