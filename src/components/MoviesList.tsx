"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { getMovies, searchMovies } from "@/services/api.service";
import { IMovie } from "@/models/types";
import "./MoviesList.css";
import Link from "next/link";
import SearchComponent from "@/components/SearchComponent";
import PaginationComponent from "@/components/PaginationComponent";

const StartPageComponent = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const NEW_RELEASE_DATE = new Date("2024-09-01");

    const loadMovies = useCallback(async (page: number) => {
        setLoading(true);
        const data = await getMovies(page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    }, []);

    const handleSearch = useCallback(async (query: string, page: number = 1) => {
        setLoading(true);

        if (query.trim().length < 3) {
            await loadMovies(page);
        } else {
            const data = await searchMovies(query, page);
            setMovies(data.results);
            setTotalPages(data.totalPages);
        }

        setLoading(false);
    }, [loadMovies]);

    useEffect(() => {
        const fetchMovies = async () => {
            if (searchQuery.length >= 3) {
                await handleSearch(searchQuery, currentPage);
            } else {
                await loadMovies(currentPage);
            }
        };
        void fetchMovies();
    }, [currentPage, searchQuery, handleSearch, loadMovies]);

    const handleSearchInputChange = (query: string) => {
        setCurrentPage(1); // Сброс на первую страницу при изменении поиска
        setSearchQuery(query);
    };

    const RatingStars = ({ rating }: { rating: number }) => {
        const MAX_STARS = 10;
        const filledStars = Math.round(rating);

        return (
            <div className="star-rating">
                {[...Array(MAX_STARS)].map((_, index) => (
                    <span key={index} className={`star-rating__star ${index < filledStars ? 'is-selected' : ''}`}> ★</span>
                ))}
            </div>
        );
    };

    return (
        <>
            <div>
                <SearchComponent onSearch={handleSearchInputChange} />
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {movies.length > 0 ? (
                                <div className="allFilm">
                                    {movies.map((movie: IMovie) => (
                                        <div key={movie.id} className={'poster'}>
                                            <Link href={`/${movie.id}`} style={{ textDecoration: "none" }}>
                                                {movie.poster_path ? (
                                                    <>
                                                        {new Date(movie.release_date) > NEW_RELEASE_DATE && (
                                                            <h6>
                                                                <span className="badge">New</span>
                                                            </h6>
                                                        )}
                                                        <img
                                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                            alt={movie.title}
                                                        />
                                                    </>
                                                ) : (
                                                    <p>{movie.title}</p>
                                                )}
                                            </Link>
                                            <div>
                                                <RatingStars rating={movie.vote_average} />
                                            </div>
                                            <Link href={`/${movie.id}`}
                                                  style={{ textAlign: 'center', textDecoration: "none", color: 'lightyellow' }}>
                                                <h4>{movie.title}</h4>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: 'white' }}>Movies not found</p>
                            )}
                        </>
                    )}
                </div>
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPreviousPage={() => setCurrentPage(currentPage - 1)}
                    onNextPage={() => setCurrentPage(currentPage + 1)}
                />
            </div>
        </>
    );
};

export default StartPageComponent;
