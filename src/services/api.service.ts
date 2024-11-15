
export async function getMovies() {
    const apiKey = 'b7a298a0b1d758ea17900529441798b0';
    const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiN2EyOThhMGIxZDc1OGVhMTc5MDA1Mjk0NDE3OThiMCIsIm5iZiI6MTczMTYxMjY3NS45OTk3NzE4LCJzdWIiOiI2NzM2NDdhODJlMmJiYzRmOGU0YTJhYjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cVh4UriTDgMUOM3Uz98eeGv0rT-hfai2_jR3MftE9X4';

    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=ua-UA&sort_by=popularity.desc`;

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
        return data.results || [];
    } catch (err) {
        console.error('Произошла ошибка:', err);
        return [];
    }
}