"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { getMoviesByGenre, getGenres } from "@/services/api.service";
import { IMovie, IGenre } from "@/models/types";
import Link from "next/link";
import "@/components/MoviesList.css";

const GenrePage = () => {
    const params = useParams();
    const genreId = Number(params.id); // Получаем id жанра из параметров маршрута

    const [movies, setMovies] = useState<IMovie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genreName, setGenreName] = useState<string>("");

    // завантажуємо всі фільми за жанром
    const loadMovies = async (genreId: number, page: number) => {
        setLoading(true);
        const data = await getMoviesByGenre(genreId, page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

    // отримуємо назву жанра
    const loadGenreName = async (genreId: number) => {
        const genres: IGenre[] = await getGenres();
        const genre = genres.find((g) => g.id === genreId);
        setGenreName(genre ? genre.name : "Неизвестный жанр");
    };

    // завантажуємо фільми та назву жанру, якщо змінюється id
    useEffect(() => {
        if (genreId) {
            loadMovies(genreId, currentPage);
            loadGenreName(genreId);
        }
    }, [genreId, currentPage]);
// ==================================================================================
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
// ==================================================================================

    return (
        <div style={{ padding: '20px', color: 'white' }}>
            <h1>Movies by genre: {genreName}</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="allFilm">
                        {movies.map((movie) => (
                            <div key={movie.id} className="poster">
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
                    <div className="pagination">
                        <button
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Back
                        </button>
                        <div>Page {currentPage} from {totalPages}</div>
                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >Next</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default GenrePage;
