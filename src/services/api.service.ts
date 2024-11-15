export async function getMovies(page: number = 1) {
    const apiKey = 'b7a298a0b1d758ea17900529441798b0';
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2EyOThhMGIxZDc1OGVhMTc5MDA1Mjk0NDE3OThiMCIsIm5iZiI6MTczMTYxMjY3NS45OTk3NzE4LCJzdWIiOiI2NzM2NDdhODJlMmJiYzRmOGU0YTJhYjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cVh4UriTDgMUOM3Uz98eeGv0rT-hfai2_jR3MftE9X4';

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
            throw new Error(`Ошибка: ${response.status}`);
        }

        const data = await response.json();
        return {
            results: data.results || [],
            totalPages: data.total_pages || 1
        };
    } catch (err) {
        console.error('Ошибка:', err);
        return {results: [], totalPages: 1};
    }
}
