import { object, string, number, array, enum as zodEnum } from 'zod';

const movieSchema = object({
    title: string("Title must be a string")
        .min(1, "Title cannot be empty"),
    year: number("Year must be a number")
        .int()
        .min(1888)
        .max(new Date().getFullYear()),
    director: string("Director must be a string")
        .min(1, "Director cannot be empty"),
    duration: number("Duration must be a number")
        .int()
        .positive(),
    poster: string("Poster must be a valid URL")
        .url(),
    genre: array(zodEnum(["Action", "Drama", "Comedy", "Horror", "Sci-Fi"], "Genre must be one of the predefined genres"))
        .min(1, "At least one genre must be specified"),
    rate: number("Rate must be a number")
        .min(0)
        .max(10)
        .default(0)
});

function validateMovie(movie) {
    return movieSchema.safeParse(movie);
}

function validateMoviePatch(movie) {
    return movieSchema.partial().safeParse(movie);
}

export { validateMovie, validateMoviePatch };