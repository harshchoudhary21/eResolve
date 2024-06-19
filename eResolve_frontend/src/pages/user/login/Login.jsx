import React from 'react';
import './Login.css'; // Ensure you have a corresponding CSS file for styling
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="login-container">
      <h2 className="login-heading">Login Page</h2>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="form-input" placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" className="form-input" placeholder="••••••••" required />
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