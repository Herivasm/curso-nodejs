import express, { json } from 'express';
import { moviesRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(corsMiddleware()); // Enable CORS for all routes
app.use(json()); // middleware to parse JSON request bodies

app.disable('x-powered-by'); // disable the 'X-Powered-By' header for security reasons

// ROUTES
app.use('/movies', moviesRouter); // Use the movies router for all routes starting with /movies

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});