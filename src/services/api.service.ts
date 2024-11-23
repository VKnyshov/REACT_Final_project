const apiKey = 'b7a298a0b1d758ea17900529441798b0';
const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2EyOThhMGIxZDc1OGVhMTc5MDA1Mjk0NDE3OThiMCIsIm5iZiI6MTczMTYxMjY3NS45OTk3NzE4LCJzdWIiOiI2NzM2NDdhODJlMmJiYzRmOGU0YTJhYjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cVh4UriTDgMUOM3Uz98eeGv0rT-hfai2_jR3MftE9X4';

export async function getMovies(page: number = 1) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        if (!response.ok) {
            console.error(`Помилка: ${response.status}`);
            return { results: [], totalPages: 1 };
        }

        const data = await response.json();
        return {
            results: data.results || [],
            totalPages: data.total_pages || 1
        };
    } catch (err) {
        console.error('Помилка у getMovies:', err);
        return { results: [], totalPages: 1 };
    }
}

export async function getGenres() {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        if (!response.ok) {
            console.error(`Помилка при отриманні жінрів: ${response.status}`);
            return [];
        }

        const data = await response.json();
        return data.genres || [];
    } catch (err) {
        console.error('Помилка у getGenres:', err);
        return [];
    }
}

export async function getMoviesByGenre(genreId: number, page: number = 1) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json;charset=utf-8'
            }
        });

        if (!response.ok) {
            console.error(`Помилка при обранні жанрів: ${response.status}`);
            return { results: [], totalPages: 1 };
        }

        const data = await response.json();
        return {
            results: data.results || [],
            totalPages: data.total_pages || 1
        };
    } catch (err) {
        console.error('Помилка у getMoviesByGenre:', err);
        return { results: [], totalPages: 1 };
    }
}

export async function searchMovies(query: string, page: number = 1) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
        });

        if (!response.ok) {
            console.error(`Помилка при пошуку фільмів: ${response.status}`);
            return { results: [], totalPages: 1 };
        }

        const data = await response.json();
        return {
            results: data.results || [],
            totalPages: data.total_pages || 1,
        };
    } catch (err) {
        console.error('Помилка в searchMovies:', err);
        return { results: [], totalPages: 1 };
    }
}


export async function getMovieById(id: number) {
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json;charset=utf-8',
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error(`Помилка при отриманні даних фільму: ${response.status}`);
            return null;
        }

        return await response.json();
    } catch (err) {
        console.error('Помилка у getMovieById:', err);
        return null;
    }
}