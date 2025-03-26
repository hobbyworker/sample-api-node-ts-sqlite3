import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import itemRoutes from './routes/item.routes';
import { initializeDB } from './config/db';
import { startDataPusher } from './services/dataPusher';

const JWT_SECRET: string = process.env.JWT_SECRET || 'your-secret-key';
const app = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Parse JSON body
app.use(express.json());

// Login endpoint for demonstration purposes (actual implementation should verify users properly)
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') {
    // Issue JWT token valid for 1 hour
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ error: 'Authentication failed: Invalid credentials.' });
  }
});

// Initialize the database (table creation, etc.)
initializeDB();

// Register item-related routes (JWT authentication middleware applied)
app.use('/api/items', itemRoutes);

// Start periodic data insertion task (daemon)
startDataPusher();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
