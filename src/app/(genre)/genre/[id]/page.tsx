"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SearchComponent from "@/components/SearchComponent";
import PaginationComponent from "@/components/PaginationComponent";
import useMovies from "@/app/hooks/useMovies";
import { getGenres } from "@/services/api.service";
import { IGenre } from "@/models/types";
import FilmsList from "@/components/ALlFilmsList";

const GenrePage = () => {
    const params = useParams();
    const genreId = Number(params.id);
    const { movies, currentPage, totalPages, loading, setCurrentPage, loadMovies, handleSearch } = useMovies();
    const [genreName, setGenreName] = useState<string>("");

    useEffect(() => {
        void (async () => {
            const genres: IGenre[] = await getGenres();
            const genre = genres.find((g) => g.id === genreId);
            setGenreName(genre ? genre.name : "Unknown Genre");
            await loadMovies(currentPage, genreId);
        })();
    }, [genreId, currentPage]);

    return (
        <div>
            <div style={{display:"flex"}}>
            <h1 style={{color:'lightyellow', width:'50%'}}>Movies by Genre: {genreName}</h1>
            <SearchComponent onSearch={(query) => handleSearch(query, 1, genreId)} />
            </div>

                {loading ? <p>Loading...</p> : <FilmsList movies={movies} />}
            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPreviousPage={() => setCurrentPage(currentPage - 1)}
                onNextPage={() => setCurrentPage(currentPage + 1)}
            />
        </div>
    );
};

export default GenrePage;