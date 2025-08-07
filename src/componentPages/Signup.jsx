

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  let navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Phone validation
    if (!/^\d{10}$/.test(form.phone)) {
      setMessage('Phone number must be 10 digits');
      return;
    }

    // Password length validation
    if (form.password.length < 6) {
      setMessage('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await fetch('http://localhost:3003/createaccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setMessage('Registration successful!');
        setForm({ username: '', email: '', phone: '', password: '' });
        toast.success("Registration successful!")
        setTimeout(()=>{
          navigate('/Login')
        },3000)

      } else {
        setMessage('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Server error. Please try again later.');
    }
  };

  const handleCancel = () => {
    setForm({
      username: '',
      email: '',
      phone: '',
      password: ''
    });
    setMessage('');
  };

  return (
    <div className="form-container">
      <ToastContainer/>
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        <label htmlFor="email">Email ID:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <br />
        <br />


        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern="[0-9]{10}"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <br />
        <br />


        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          minLength={6}
          required
        />

        <br />
        <br />


        <div className="buttons">
          <button type="submit">Create</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
      <div id="message">{message}</div>
    </div>
  );
};

export default Signup;
