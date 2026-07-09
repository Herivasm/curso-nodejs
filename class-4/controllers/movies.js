import { MovieModel } from '../models/movie.js';
import { validateMovie, validateMoviePatch } from '../schemas/movie.js';

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query;
        const movies = await MovieModel.getAll({ genre });

        res.json(movies);
    }

    static async getById(req, res) {
        const { id } = req.params;
        const movie = await MovieModel.getById(id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json(movie);
    }

    static async create(req, res) {
        const result = validateMovie(req.body);

        if (!result.success) {
            return res.status(400).json({ message: 'Invalid movie data', errors: result.error.issues });
        }

        const newMovie = await MovieModel.create(result.data);
        res.status(201).json(newMovie);
    }

    static async update(req, res) {
        const result = validateMoviePatch(req.body);
        const { id } = req.params;

        if (!result.success) {
            return res.status(400).json({ message: 'Invalid movie data', errors: result.error.issues });
        }

        const updatedMovie = await MovieModel.update({ id, movieData: result.data });

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.json(updatedMovie);
    }

    static async delete(req, res) {
        const { id } = req.params;
        const isDeleted = await MovieModel.delete({ id });

        if (!isDeleted) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        return res.json({ message: 'Movie deleted successfully' });
    }
}