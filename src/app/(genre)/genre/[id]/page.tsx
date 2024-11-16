"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { getMoviesByGenre, getGenres, searchMovies } from "@/services/api.service";
import { IMovie, IGenre } from "@/models/types";
import Link from "next/link";
import "@/components/MoviesList.css";
import SearchComponent from "@/components/SearchComponent";

const GenrePage = () => {
    const params = useParams();
    const genreId = Number(params.id);

    const [movies, setMovies] = useState<IMovie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genreName, setGenreName] = useState<string>("");


    // завантаження фільмів за жанром
    const loadMovies = async (genreId: number, page: number) => {
        setLoading(true);
        const data = await getMoviesByGenre(genreId, page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

    // пошук фільмів
    const handleSearch = async (query: string, page: number = 1) => {
        if (query.length < 3) {

            loadMovies(genreId, page);
            return;
        }

        setLoading(true);

        const data = await searchMovies(query, page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

    // для отримання назви жанру
    const loadGenreName = async (genreId: number) => {
        const genres: IGenre[] = await getGenres();
        const genre = genres.find((g) => g.id === genreId);
        setGenreName(genre ? genre.name : "Неизвестный жанр");
    };

    // Завантаження данних при зміні id
    useEffect(() => {
        if (genreId) {
            loadMovies(genreId, currentPage);
            loadGenreName(genreId);
        }
    }, [genreId, currentPage]);

    // обробник для пошукового запросу
    const handleSearchInputChange = (query: string) => {

        setCurrentPage(1);
        handleSearch(query);
    };

    // пагінація
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
        <div style={{padding: '20px', color: 'white' }}>
            <h1 style={{ margin: '0 0 2% 5%' }}>Movies by genre: {genreName}</h1>

            <SearchComponent onSearch={handleSearchInputChange} />

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
                                <Link href={`/${movie.id}`} style={{ textDecoration: "none", color: '#300906' }}>
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
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default GenrePage;
