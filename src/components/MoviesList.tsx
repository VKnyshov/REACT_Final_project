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
    const [isSearching, setIsSearching] = useState(false);

    // завантаження фільмів
    const loadMovies = useCallback(async (page: number) => {
        setLoading(true);
        const data = await getMovies(page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    }, []);

    // пошук фільмів
    const handleSearch = useCallback(async (query: string, page: number = 1) => {
        if (query.length < 3) {
            setIsSearching(false);
            await loadMovies(page);
            return;
        }

        setLoading(true);
        setIsSearching(true);
        const data = await searchMovies(query, page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    }, [loadMovies]);

    // Юзефект для завантаження пошуку фільмів
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                if (isSearching) {
                    await handleSearch('', currentPage);
                } else {
                    await loadMovies(currentPage);
                }
            } catch (error) {
                console.error("Помилка при завантаженні фільму:", error);
            }
        };

        void fetchMovies();
    }, [currentPage, isSearching, handleSearch, loadMovies]);



    const handleSearchInputChange = async (query: string) => {
        setCurrentPage(1);
        await handleSearch(query);
    };

    // Компонент рейтинга звезд
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
                                                    <img
                                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                        alt={movie.title}
                                                    />
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
