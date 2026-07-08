const z = require('zod');

const movieSchema = z.object({
    title: z.string("Title must be a string")
        .min(1, "Title cannot be empty"),
    year: z.number("Year must be a number")
        .int()
        .min(1888)
        .max(new Date().getFullYear()),
    director: z.string("Director must be a string")
        .min(1, "Director cannot be empty"),
    duration: z.number("Duration must be a number")
        .int()
        .positive(),
    poster: z.string("Poster must be a valid URL")
        .url(),
    genre: z.array(z.enum(["Action", "Drama", "Comedy", "Horror", "Sci-Fi"], "Genre must be one of the predefined genres"))
        .min(1, "At least one genre must be specified"),
    rate: z.number("Rate must be a number")
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

module.exports = { validateMovie, validateMoviePatch };