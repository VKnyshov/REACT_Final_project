"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { getMovies, searchMovies } from "@/services/api.service";
import { IMovie } from "@/models/types";
import "./MoviesList.css";
import Link from "next/link";
import SearchComponent from "@/components/SearchComponent";

const StartPageComponent = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    // Завантажуємо фільми
    const loadMovies = useCallback(async (page: number) => {
        setLoading(true);
        const data = await getMovies(page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    }, []);

    // шукаємо фільми
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

    // Юзефект для завантаження і пошуку фільмів
    useEffect(() => {
        if (isSearching) {
            handleSearch('', currentPage);
        } else {
            loadMovies(currentPage);
        }
    }, [currentPage, isSearching, handleSearch, loadMovies]);

    // функція обробник змін значень уінпуті, далі передається у SearchComponent
    const handleSearchInputChange = (query: string) => {
        setCurrentPage(1);
        handleSearch(query); // Выполняем поиск
    };

    // Пагинация
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
