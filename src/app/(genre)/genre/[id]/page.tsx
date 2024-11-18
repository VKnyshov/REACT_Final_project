"use client";

import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import {getMoviesByGenre, getGenres, searchMovies} from "@/services/api.service";
import {IMovie, IGenre} from "@/models/types";
import Link from "next/link";
import "@/components/MoviesList.css";
import SearchComponent from "@/components/SearchComponent";
import PaginationComponent from "@/components/PaginationComponent";

const GenrePage = () => {
    const params = useParams();
    const genreId = Number(params.id);

    const [movies, setMovies] = useState<IMovie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genreName, setGenreName] = useState<string>("");

    const loadMovies = async (genreId: number, page: number) => {
        setLoading(true);
        const data = await getMoviesByGenre(genreId, page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

    const handleSearch = async (query: string, page: number = 1) => {
        if (query.length < 3) {
            await loadMovies(genreId, page);
            return;
        }

        setLoading(true);
        const data = await searchMovies(query, page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    };

    const loadGenreName = async (genreId: number) => {
        const genres: IGenre[] = await getGenres();
        const genre = genres.find((g) => g.id === genreId);
        setGenreName(genre ? genre.name : "Такий жанр відсутній");
    };

    useEffect(() => {
        (async () => {
            try {
                if (genreId) {
                    await loadMovies(genreId, currentPage);
                    await loadGenreName(genreId);
                }
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            }
        })();
    }, [genreId, currentPage]);

    const handleSearchInputChange = (query: string) => {
        setCurrentPage(1);
        handleSearch(query).catch((err) => console.error(err));
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

    const RatingStars = ({rating}: { rating: number }) => {
        const MAX_STARS = 10;
        const filledStars = Math.round(rating);

        return (
            <div className="star-rating">
                {[...Array(MAX_STARS)].map((_, index) => (
                    <span key={index}
                          className={`star-rating__star ${index < filledStars ? 'is-selected' : ''}`}> ★</span>
                ))}
            </div>
        );
    };

    return (
        <div style={{padding: '20px', color: 'white'}}>
            <h1 style={{margin: '0 0 2% 5%'}}>Movies by genre: {genreName}</h1>

            <SearchComponent onSearch={handleSearchInputChange}/>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <div className="allFilm">
                        {movies.map((movie) => (
                            <div key={movie.id} className="poster">
                                <Link href={`/${movie.id}`} style={{textDecoration: "none"}}>
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
                                    <RatingStars rating={movie.vote_average}/>
                                </div>
                                <Link href={`/${movie.id}`}
                                      style={{textAlign: 'center', textDecoration: "none", color: 'lightyellow'}}>
                                    <h4>{movie.title}</h4>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPreviousPage={handlePreviousPage}
                        onNextPage={handleNextPage}
                    />
                </>
            )}
        </div>
    );
};

export default GenrePage;