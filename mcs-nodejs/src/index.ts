import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

// Load environment variables before any other imports
dotenv.config();

// Validate required environment variables
const requiredEnvVars = [
  'DB_HOST',
  'DB_PORT',
  'DB_USER',
  'DB_PASSWORD',
  'DB_NAME'
];

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error('Error: Required environment variables are not set:', missingEnvVars);
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: 'http://localhost:3000', // Permite solo este origen
  credentials: true, // Permite cookies/credenciales
  optionsSuccessStatus: 200 // Algunos navegadores legacy (IE11, varios SmartTVs) se ahogan con 204
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});