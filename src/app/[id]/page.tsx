"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "@/components/MoviesList.css";
import { IFilm } from "@/models/types";
import { getMovieById, searchMovies } from "@/services/api.service";
import SearchComponent from "@/components/SearchComponent";
import PaginationComponent from "@/components/PaginationComponent";
import Link from "next/link";
import Image from "next/image";

const MoviesListCard = () => {
    const { id } = useParams();
    const [film, setFilm] = useState<IFilm | null>(null);
    const [movies, setMovies] = useState<IFilm[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const NEW_RELEASE_DATE = new Date("2024-09-01");

    const fetchMovies = async (query: string, page: number = 1) => {
        setLoading(true);
        if (query.trim().length >= 3) {
            const data = await searchMovies(query, page);
            setMovies(data.results);
            setTotalPages(data.totalPages);
        } else {
            setMovies([]);
            setTotalPages(1);
        }
        setLoading(false);
    };

    const handleSearch = async (query: string) => {
        setCurrentPage(1);
        setSearchQuery(query);
        await fetchMovies(query, 1);
    };

    const handlePageChange = async (page: number) => {
        setCurrentPage(page);
        await fetchMovies(searchQuery, page);
    };

    useEffect(() => {
        const fetchFilm = async () => {
            if (id && searchQuery.length < 3) {
                const movieData = await getMovieById(Number(id));
                setFilm(movieData);
            }
        };

        void fetchFilm();
    }, [id, searchQuery]);

    const RatingStars = ({ rating }: { rating: number }) => {
        const MAX_STARS = 10;
        const filledStars = Math.round(rating);

        return (
            <div className="star-rating">
                {[...Array(MAX_STARS)].map((_, index) => (
                    <span
                        key={index}
                        className={`star-rating__star ${index < filledStars ? "is-selected" : ""}`}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div>
            <SearchComponent onSearch={handleSearch} />

            {loading ? (
                <p>Loading...</p>
            ) : searchQuery.length >= 3 && movies.length > 0 ? (
                <>
                    <div className="allMovies">
                        {movies.map((movie: IFilm) => (
                            <div key={movie.id} className="poster">
                                <h6>
                                    {new Date(movie.release_date) > NEW_RELEASE_DATE && (
                                        <span className="badge">New</span>
                                    )}
                                </h6>
                                <Link href={`/${movie.id}`} style={{ textDecoration: "none" }}>
                                    {movie.poster_path ? (
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            width={150}
                                            height={225}
                                            style={{ borderRadius: "10px" }}
                                            priority
                                        />

                                    ) : (
                                        <p>{movie.title}</p>
                                    )}
                                </Link>
                                <div>
                                    <RatingStars rating={movie.vote_average} />
                                </div>
                                <Link
                                    href={`/${movie.id}`}
                                    style={{textAlign: "center", textDecoration: "none", color: "lightyellow",}}>
                                    <h4>{movie.title}</h4>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPreviousPage={() => handlePageChange(currentPage - 1)}
                        onNextPage={() => handlePageChange(currentPage + 1)}
                    />
                </>
            ) : film ? (
                <>
                    <div className="details">
                        <div className="poster-container">
                            {new Date(film.release_date) > NEW_RELEASE_DATE && (
                                <span className="badge">New</span>
                            )}
                            {film.poster_path && (
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                                    alt={film.title}
                                    width={250}
                                    height={375}
                                    style={{ borderRadius: "10px" }}
                                    priority
                                />
                            )}
                        </div>

                        <div>
                            <h1>{film.title}</h1>
                            <p style={{ paddingBottom: "20px" }}>Tagline: {film.tagline}</p>
                            <div style={{ paddingBottom: "20px" }}>
                                <h4>Rating ({film.vote_average}):</h4>
                                <RatingStars rating={film.vote_average} />
                            </div>
                            <p>Release Date: {film.release_date}</p>
                            <p>Budget: {film.budget}</p>
                            <p>Genres: {film.genres.map((genre) => genre.name).join(", ")}</p>
                            <p>Home page: <a href={film.homepage}>{film.homepage}</a></p>
                            <p>Origin country: {film.origin_country}</p>
                            <p>Original language: {film.original_language}</p>
                            <p>Original title: {film.original_title}</p>
                            <p>Popularity: {film.popularity}</p>
                            <p>Production Companies:{" "}
                                {film.production_companies.map((prodC) => prodC.name).join(", ")}
                            </p>
                            <p>Production Countries:{" "}
                                {film.production_countries.map((prodCo) => prodCo.name).join(", ")}
                            </p>
                            <p>Revenue: {film.revenue}</p>
                            <p>Runtime: {film.runtime} minutes</p>
                            <p>Spoken Languages:{" "}
                                {film.spoken_languages.map((spl) => spl.name).join(", ")}
                            </p>
                            <p>Status: {film.status}</p>
                        </div>
                    </div>
                    <h2 style={{ color: "lightyellow", padding: "1% 10%" }}>Description:</h2>
                    <p style={{ color: "lightyellow", padding: "1% 10%" }}>{film.overview}</p>
                </>
            ) : (
                <p style={{ color: "white" }}>Movies not found</p>
            )}
        </div>
    );
};

export default MoviesListCard;