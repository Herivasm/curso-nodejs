const crypto = require('node:crypto');

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            'http://127.0.0.1:3001',
            'http://example.com'
        ]; // Replace with your allowed origins

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true);
        }

        if (!origin) {
            return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
        }

        return callback(new Error('Not allowed by CORS'));
    }
})); // Enable CORS for all routes

const movies = require('./movies.json');
const { validateMovie, validateMoviePatch } = require('./schemas/movie');

app.use(express.json()); // middleware to parse JSON request bodies
app.disable('x-powered-by'); // disable the 'X-Powered-By' header for security reasons

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

app.get('/movies', (req, res) => {
    const { genre } = req.query;

    if (genre) {
        const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()));
        return res.json(filteredMovies);
    }

    res.json(movies);
});

app.get('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find(m => m.id === id);

    if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
    }

    res.json(movie);
});

app.post('/movies', (req, res) => {
    const result = validateMovie(req.body);

    if (!result.success) {
        return res.status(400).json({ message: 'Invalid movie data', errors: result.error.issues });
    }

    // TODO: Database logic to save the new movie would go here. For now, we will just add it to the in-memory array.
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    };

    //! This is not RESTful because it modifies the server's state without a proper database or persistent storage. In a real application, you would typically save the new movie to a database instead of an in-memory array.
    movies.push(newMovie);
    res.status(201).json(newMovie);
});

app.patch('/movies/:id', (req, res) => {
    const result = validateMoviePatch(req.body);

    if (!result.success) {
        return res.status(400).json({ message: 'Invalid movie data', errors: result.error.issues });
    }

    const { id } = req.params;
    const movieIndex = movies.findIndex(m => m.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' });
    }

    // Update the movie with the new data
    const updatedMovie = {
        ...movies[movieIndex],
        ...result.data
    };

    movies[movieIndex] = updatedMovie;
    return res.json(updatedMovie);
});

app.delete('/movies/:id', (req, res) => {
    const { id } = req.params;
    const movieIndex = movies.findIndex(m => m.id === id);

    if (movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' });
    }

    // Remove the movie from the array
    movies.splice(movieIndex, 1);
    return res.json({ message: 'Movie deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});