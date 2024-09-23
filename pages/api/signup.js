import { fetchData } from '../../services/apiService'; // Adjust the import path as necessary

export default async function handler(req, res) {
    try {
        const { username, password, email, firstName, lastName, isAdmin, role  } = req.body;
        const data = await fetchData({ endpoint: '/api/v1/auth/signup', method: 'POST', body: { username, password, email, firstName, lastName, isAdmin, role } });

        // Set token as HTTP-only cookie
        res.setHeader('Set-Cookie', `token=${data.token}; HttpOnly; Path=/; Max-Age=3600`);
  
        const books = await fetchData({ endpoint: '/api/v1/library/books', method: 'GET', body: null, token: data.token });
        res.status(200).json({ token: data.token, books });
    } catch (error) {
        console.error('Login error:', error);
        res.status(401).json({ error: 'Invalid credentials or an error occurred.' });
    }
} 
