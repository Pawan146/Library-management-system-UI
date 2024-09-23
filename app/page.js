"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e, "--e check");
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful! Fetching books...');
      router.push(`/book?books=${encodeURIComponent(JSON.stringify(data.books))}`);
    } catch (error) {
      console.log(error, "---error");
      toast.error('Invalid credentials or an error occurred. Please try again or try to signup if account not already created1', { autoClose: 3000 });
    }
  };

  const handleCreateAccount = () => {
    router.push('/signup');
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <ToastContainer />
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 'bold', color: 'white', backgroundColor: 'black', padding: '10px', borderRadius: '5px' }}>
        Welcome to Library Management System
      </h1>
      <div style={{ width: '600px', textAlign: 'center' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div style={{ flex: '1', marginRight: '10px' }}>
              <label htmlFor="username" style={{ fontWeight: 'bold', color: 'white' }}>Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px', fontWeight: 'bold', color: 'black' }}
              />
            </div>
            <div style={{ flex: '1', marginLeft: '10px' }}>
              <label htmlFor="password" style={{ fontWeight: 'bold', color: 'white' }}>Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px', fontWeight: 'bold', color: 'black' }}
              />
            </div>
          </div>
          <button type="submit" style={{ width: '100%', padding: '10px', fontWeight: 'bold', backgroundColor: 'blue', color: 'white' }}>Login</button>
        </form>
        <p style={{ marginTop: '15px', color: 'white' }}>Create an account if it doesn't exist</p>
        <button
          onClick={handleCreateAccount}
          style={{ marginTop: '10px', padding: '10px 20px', fontSize: '1rem', fontWeight: 'bold', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          Create Account
        </button>
      </div>
    </div>
  );
}