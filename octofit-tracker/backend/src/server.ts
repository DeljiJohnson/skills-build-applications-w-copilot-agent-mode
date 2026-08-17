import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB().catch((error) => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker Backend is running',
    port: PORT,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ OctoFit Tracker Backend running on http://localhost:${PORT}`);
});

export default app;
