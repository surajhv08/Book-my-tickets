import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3003/createaccount');
      const users = await response.json();

      const user = users.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (user) {
        toast.success('Login Successful!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error('Invalid Email or Password');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Server error. Please try again later.');
    }
  };

  const handleCancel = () => {
    setForm({ email: '', password: '' });
  };

  return (
    <div>
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email ID:</label><br />
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter Email ID"
          required
        />
        <br /><br />

        <label htmlFor="password">Password:</label><br />
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />
        <br /><br />

        <button type="submit">Login</button>
        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
      </form>

      <p>
        Don't have an account? <a href="/signup">Sign up here</a>
      </p>
    </div>
  );
};

export default Login;
