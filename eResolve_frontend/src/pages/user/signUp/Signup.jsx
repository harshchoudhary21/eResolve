import React from 'react';
import './SignUp.css'; // Import your CSS file
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="signup-container">
      <h2 className="signup-heading">Signup Page</h2>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
           
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
             
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                  <input type="text" name="name" id="name" className="form-input" placeholder="John Doe" required />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="form-input" placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" className="form-input" placeholder="••••••••" required />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="password" name="confirm-password" id="confirm-password" className="form-input" placeholder="••••••••" required />
                </div>
                <div className='role-button'>
                  <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role  </label>
                  <select name="role" id="role" className="form-select" required>
                    <option value="user" selected>User</option>
                    <option value="admin">Admin</option>
                    <option value="organization">Organization</option>
                  </select>
                </div>
                <div className='Submit-Button'>
                <button type="submit" className="submit-button">Create an account</button>
                </div>
               
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?    <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignUp;