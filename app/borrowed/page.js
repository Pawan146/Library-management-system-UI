"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Borrowed() {
  const router = useRouter();
  const [borrowedDetails, setBorrowedDetails] = useState(null);

  const fetchBorrowBookHistory = async () => {
    try {
      const response = await fetch(`/api/borrow-history`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch borrow history');
      }

      const data = await response.json();
      toast.success('Borrow history fetched successfully!');

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

      setBorrowedDetails(borrowedQuery);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to fetch borrow history. Please try again.');
    }
  };

  useEffect(() => {
    fetchBorrowBookHistory();
  }, []);

  if (!borrowedDetails) {
    return <p>Loading...</p>;
  }

  const handleReturn = async (bookId) => {
    try {
      const response = await fetch(`/api/return-book?bookId=${bookId}`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to return book');
      }

      toast.success(`Book with ID ${bookId} returned successfully!`);

      // Remove the returned book from the borrowedDetails state
      setBorrowedDetails((prevDetails) =>
        prevDetails.filter((detail) => detail.id !== bookId)
      );
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Failed to return book. Please try again.');
    }
  };

  const handleLogout = () => {
    router.push('/'); // Redirect to home page
  };

  return (
    <div style={{ backgroundColor: 'black', minHeight: '100vh', padding: '20px', color: 'white' }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Borrowed Book Details</h1>
        <p style={{ fontWeight: 'bold' }}>{borrowedDetails[0]?.username}</p>
      </div>
      {borrowedDetails.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
          <p>No books are borrowed</p>
        </div>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid white', padding: '10px' }}>Book_Id</th>
              <th style={{ border: '1px solid white', padding: '10px' }}>Title</th>
              <th style={{ border: '1px solid white', padding: '10px' }}>Author</th>
              <th style={{ border: '1px solid white', padding: '10px' }}>Borrowed Date</th>
              <th style={{ border: '1px solid white', padding: '10px' }}>Return Date</th>
              <th style={{ border: '1px solid white', padding: '10px' }}>Returned</th>
              <th style={{ border: '1px solid white', padding: '10px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrowedDetails.map((detail) => (
              <tr key={detail.id}>
                <td style={{ border: '1px solid white', padding: '10px' }}>{detail.id}</td>
                <td style={{ border: '1px solid white', padding: '10px' }}>{detail.title}</td>
                <td style={{ border: '1px solid white', padding: '10px' }}>{detail.author}</td>
                <td style={{ border: '1px solid white', padding: '10px' }}>{detail.borrowed_date}</td>
                <td style={{ border: '1px solid white', padding: '10px' }}>{detail.return_date || 'N/A'}</td>
                <td style={{ border: '1px solid white', padding: '10px' }}>{detail.returned ? 'Yes' : 'No'}</td>
                <td style={{ border: '1px solid white', padding: '10px' }}>
                  <button
                    onClick={() => handleReturn(detail.id)}
                    style={{ padding: '5px 10px', fontWeight: 'bold', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}
                    disabled={detail.returned}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button
        onClick={() => router.push('/book')}
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
        Back to Book Page
      </button>
    </div>
  );
}