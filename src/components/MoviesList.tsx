"use client";

import useMovies from "@/app/hooks/useMovies";
import SearchComponent from "@/components/SearchComponent";
import PaginationComponent from "@/components/PaginationComponent";
import FilmsList from "@/components/ALlFilmsList";
import React, { useEffect } from "react";

const StartPageComponent = () => {
    const {
        movies,
        currentPage,
        totalPages,
        loading,
        setCurrentPage,
        loadMovies,
        handleSearch,
    } = useMovies();

    useEffect(() => {
        const fetchMovies = async () => {
            await loadMovies(currentPage);
        };

        void fetchMovies();
    }, [currentPage, loadMovies]);

    return (
        <div>
            <SearchComponent onSearch={(query) => handleSearch(query, 1)} />

            {loading ? <p>Loading...</p> : <FilmsList movies={movies} />}

            <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPreviousPage={() => setCurrentPage(currentPage - 1)} // Смена на предыдущую страницу
                onNextPage={() => setCurrentPage(currentPage + 1)} // Смена на следующую страницу
            />
        </div>
    );
};

export default StartPageComponent;