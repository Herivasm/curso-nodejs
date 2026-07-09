import cors from 'cors';

const ACCEPTED_ORIGINS = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://127.0.0.1:3001',
    'http://example.com'
]; // Replace with your allowed origins

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => cors({
    origin: (origin, callback) => {
        if (acceptedOrigins.includes(origin)) {
            return callback(null, true);
        }

        if (!origin) {
            return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
        }

        return callback(new Error('Not allowed by CORS'));
    }
})