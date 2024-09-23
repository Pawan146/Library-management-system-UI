import { fetchData } from '../../services/apiService'; // Adjust the import path as necessary

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const token = req.cookies.token; // Read the token from the HTTP-only cookie

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      const borrowBookHistory = await fetchData({
        endpoint: '/api/v1/library/books',
        method: 'GET',
        body: null,
        token,
      });

      res.status(200).json(borrowBookHistory);
    } catch (error) {
        res.status(error?.status_code).json({ error: error?.message || 'Failed to fetch books' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}