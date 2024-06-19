import React, { useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    phoneNumber: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSubmit(event) {
  event.preventDefault();
  const formData = {
    name: event.target.name.value,
    email: event.target.email.value,
    phoneNumber: event.target.phone.value, // Ensure this matches the server's expected field
    password: event.target.password.value,
  };

  try {
    const response = await axios.post('http://localhost:5000/api/v1/register', formData);
    console.log('Registration successful', response.data);
    // Handle successful registration (e.g., redirect to login page)
  } catch (error) {
    console.error('Registration failed', error.response.data);
    // Handle error (e.g., display error message to the user)
  }
}

  return (
    <div className="signup-container">
      <h2 className="signup-heading">Signup Page</h2>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                  <input type="text" name="name" id="name" className="form-input" placeholder="John Doe" required onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="form-input" placeholder="name@company.com" required onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone number</label>
                <input type="tel" name="phoneNumber" id="phone" className="form-input" placeholder="123-456-7890" required onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" className="form-input" placeholder="••••••••" required onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                  <input type="password" name="confirmPassword" id="confirm-password" className="form-input" placeholder="••••••••" required onChange={handleChange} />
                </div>
                <div className='role-button'>
                  <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                  <select name="role" id="role" className="form-select" required onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="organization">Organization</option>
                  </select>
                </div>
                <div className='Submit-Button'>
                  <button type="submit" className="submit-button">Create an account</button>
                </div>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignUp;