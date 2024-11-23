import React from "react";
import Link from "next/link";
import { IMovie } from "@/models/types";

const NEW_RELEASE_DATE = new Date("2024-09-01");

interface MoviesListProps {
    movies: IMovie[];
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
    const MAX_STARS = 10;
    const filledStars = Math.round(rating);

    return (
        <div className="star-rating">
            {[...Array(MAX_STARS)].map((_, index) => (
                <span key={index} className={`star-rating__star ${index < filledStars ? "is-selected" : ""}`}>
                    ★
                </span>
            ))}
        </div>
    );
};

const MoviesList: React.FC<MoviesListProps> = ({ movies }) => {
    return (
        <div className="allMovies">
            {movies.map((movie) => (
                <div key={movie.id} className="poster">
                    <h6>
                        {new Date(movie.release_date) > NEW_RELEASE_DATE && (
                            <span className="badge">New</span>
                        )}
                    </h6>
                    <Link href={`/${movie.id}`} style={{ textDecoration: "none" }}>
                        {movie.poster_path ? (
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                style={{ width: "150px", borderRadius: "10px" }}
                            />
                        ) : (
                            <p>{movie.title}</p>
                        )}
                    </Link>
                    <div>
                        <RatingStars rating={movie.vote_average} />
                    </div>
                    <Link href={`/${movie.id}`} style={{ textAlign: "center", textDecoration: "none", color: "lightyellow" }}>
                        <h4>{movie.title}</h4>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MoviesList;
