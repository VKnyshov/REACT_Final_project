import { useState, useCallback } from "react";
import { getMovies, searchMovies, getMoviesByGenre } from "@/services/api.service";
import { IMovie } from "@/models/types";

const useMovies = (initialMovies: IMovie[] = []) => {
    const [movies, setMovies] = useState<IMovie[]>(initialMovies);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const loadMovies = useCallback(async (page: number, genreId?: number) => {
        // setLoading(true);
        const data = genreId
            ? await getMoviesByGenre(genreId, page)
            : await getMovies(page);
        setMovies(data.results);
        setTotalPages(data.totalPages);
        setLoading(false);
    }, []);

    const handleSearch = useCallback(async (query: string, page: number = 1, genreId?: number) => {
        // setLoading(true);
        setSearchQuery(query);

        if (query.trim().length >= 3) {
            const data = await searchMovies(query, page);
            setMovies(data.results);
            setTotalPages(data.totalPages);
        } else {
            await loadMovies(page, genreId);
        }

        setCurrentPage(page);
        setLoading(false);
    }, [loadMovies]);

    const handlePageChange = useCallback(
        async (page: number, genreId?: number) => {
            setLoading(true);

            if (searchQuery.trim().length >= 3) {
                const data = await searchMovies(searchQuery, page);
                setMovies(data.results);
                setTotalPages(data.totalPages);
            } else {
                await loadMovies(page, genreId);
            }

            setCurrentPage(page);
            setLoading(false);
        },
        [searchQuery, loadMovies]
    );

    return {
        movies,
        currentPage,
        totalPages,
        loading,
        setCurrentPage,
        handleSearch,
        handlePageChange,
        loadMovies, // Добавлено
    };
};

export default useMovies;
