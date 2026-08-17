import express, { type Express, type NextFunction, type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database';
import apiRoutes from './routes';

dotenv.config();

const app: Express = express();
const PORT = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB().catch((error) => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    message: 'OctoFit Tracker Backend is running',
    port: PORT,
    apiUrl: apiBaseUrl,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', apiRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✓ OctoFit Tracker Backend running on ${apiBaseUrl}`);
  });
}

export { apiBaseUrl };
export default app;
