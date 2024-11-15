"use client";

import React, { useState, useEffect } from 'react';
import { getMovies } from "@/services/api.service";
import { IMovie } from "@/models/types";
import "./MoviesList.css";
import Link from "next/link";

const StartPageComponent = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    // Функция для загрузки фильмов
    const loadMovies = async (page: number) => {
        setLoading(true);
        const data = await getMovies(page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

    // Загружаем фильмы при изменении страницы
    useEffect(() => {
        loadMovies(currentPage);
    }, [currentPage]);

    // Обработчики кнопок пагинации
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
                <div>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {movies.length > 0 ? (
                                <div className="oneFilm">
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
                                            <Link href={`/${movie.id}`} style={{ textDecoration: "none" }}>
                                                <h4>{movie.title}</h4>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>undefind</p>
                            )}
                        </>
                    )}
                </div>

                {/* Пагінація */}
                <div className="pagination">
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >Back </button>
                    <span>Page {currentPage} from {totalPages}</span>
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
