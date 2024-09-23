"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    isAdmin: false,
    role: 'ROLE_USER'
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const adjustedFormData = {
      ...formData,
      role: formData.isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER'
    };
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(adjustedFormData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      console.log('Signup successful! Fetching books...');
      router.push(`/book?books=${encodeURIComponent(JSON.stringify(data.books))}`);
    } catch (error) {
      toast.error('An error occurred during signup. Please try again.');
    }
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <ToastContainer />
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 'bold', color: 'white', backgroundColor: 'black', padding: '10px', borderRadius: '5px' }}>
        Signup for Library Management System
      </h1>
      <div style={{ width: '600px', textAlign: 'center' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username" style={{ fontWeight: 'bold', color: 'white' }}>Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', fontWeight: 'bold', color: 'black' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ fontWeight: 'bold', color: 'white' }}>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', fontWeight: 'bold', color: 'black' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ fontWeight: 'bold', color: 'white' }}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', fontWeight: 'bold', color: 'black' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="firstName" style={{ fontWeight: 'bold', color: 'white' }}>First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', fontWeight: 'bold', color: 'black' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="lastName" style={{ fontWeight: 'bold', color: 'white' }}>Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px', marginTop: '5px', fontWeight: 'bold', color: 'black' }}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="isAdmin" style={{ fontWeight: 'bold', color: 'white' }}>Admin:</label>
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={formData.isAdmin}
              onChange={handleChange}
              style={{ marginLeft: '10px' }}
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', fontWeight: 'bold', backgroundColor: 'blue', color: 'white' }}>Signup</button>
        </form>
      </div>
    </div>
  );
}