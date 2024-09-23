"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Book() {
  const [books, setBooks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/get-book', {
          method: 'GET',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch books');
        }

        const data = await response.json();
        setBooks(data);
      } catch (error) {
        toast.error(error.message || 'Failed to fetch books.');
      }
    };

    fetchBooks();
  }, []);

  const handleBorrow = async (bookId) => {
    try {
      const response = await fetch(`/api/borrow-book?bookId=${bookId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to borrow book');
      }

      const data = await response.json();
      toast.success(`Book with ID ${bookId} borrowed successfully!`);

      // Construct the borrowedQuery array with the necessary details
      const borrowedQuery = data.map((item) => ({
        id: item.book.id,
        title: item.book.title,
        author: item.book.author,
        borrowed_date: item.borrow_date,
        return_date: item.return_date,
        returned: item.returned,
        username: item.user.username,
      }));

      router.push(`/borrowed?books=${encodeURIComponent(JSON.stringify(borrowedQuery))}`);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to borrow book. Please try again.');
    }
  };

  const handleLogout = () => {
  //  Cookies.remove('token'); // Remove the token from cookies
    router.push('/'); // Redirect to home page
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <ToastContainer />
      <button
        onClick={handleLogout}
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
        }}
      >
        Logout
      </button>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', fontWeight: 'bold', color: 'white', backgroundColor: 'black', padding: '10px', borderRadius: '5px' }}>
        Library Books
      </h1>
      <div style={{ width: '600px', textAlign: 'center', color: 'white' }}>
        {books.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid white', padding: '10px' }}>ID</th>
                <th style={{ border: '1px solid white', padding: '10px' }}>Title</th>
                <th style={{ border: '1px solid white', padding: '10px' }}>Author</th>
                <th style={{ border: '1px solid white', padding: '10px' }}>Copies Available</th>
                <th style={{ border: '1px solid white', padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.uuid}>
                  <td style={{ border: '1px solid white', padding: '10px' }}>{book.id}</td>
                  <td style={{ border: '1px solid white', padding: '10px' }}>{book.title}</td>
                  <td style={{ border: '1px solid white', padding: '10px' }}>{book.author}</td>
                  <td style={{ border: '1px solid white', padding: '10px' }}>{book.copies_available}</td>
                  <td style={{ border: '1px solid white', padding: '10px' }}>
                    <button
                      onClick={() => handleBorrow(book.id)}
                      style={{ padding: '5px 10px', fontWeight: 'bold', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}
                    >
                      Borrow
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books available.</p>
        )}
      </div>
      <button
        onClick={() => router.push('/borrowed')}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
        }}
      >
        Go to Borrowed Page
      </button>
    </div>
  );
}