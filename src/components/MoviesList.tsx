"use client";

import React, { useState, useEffect } from 'react';
import { getMovies, searchMovies } from "@/services/api.service";
import { IMovie } from "@/models/types";
import "./MoviesList.css";
import Link from "next/link";

const StartPageComponent = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const loadMovies = async (page: number) => {
        setLoading(true);
        const data = await getMovies(page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

    const handleSearch = async (query: string, page: number = 1) => {
        if (query.length < 3) {
            setIsSearching(false);
            loadMovies(page);
            return;
        }

        setLoading(true);
        setIsSearching(true);
        const data = await searchMovies(query, page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

    useEffect(() => {
        if (isSearching) {
            handleSearch(searchQuery, currentPage);
        } else {
            loadMovies(currentPage);
        }
    }, [currentPage, isSearching]);

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        setCurrentPage(1);
        handleSearch(value);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <div>
                <div style={{ marginBottom: '20px' }}>
                    <input
                        type="text"
                        placeholder="Enter the name of movie..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        style={{
                            padding: '10px',
                            margin: '1% 0 0 64%',
                            width: '100%',
                            maxWidth: '300px',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
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
                                            <Link href={`/${movie.id}`} style={{ textDecoration: "none", color:'#300906' }}>
                                                <h4>{movie.title}</h4>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{color:'white'}}>Movies not found</p>
                            )}
                        </>
                    )}
                </div>

                {/* Пагинация */}
                <div className="pagination">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >Back</button>
                    <div>Page {currentPage} from {totalPages}</div>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >Next</button>
                </div>
            </div>
        </>
    );
};

export default StartPageComponent;
