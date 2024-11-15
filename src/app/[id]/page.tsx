import React from 'react';
import '@/components/startPage.css'
import {IFilm} from "@/models/types";

interface ParamsProps {
    params: {
        id: string;
    };
}

const ChoiseFilmByIdPage = async ({params}: ParamsProps) => {
    const {id} = params; // Извлекаем id из params

    const film: IFilm = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=b7a298a0b1d758ea17900529441798b0`,
        {
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            cache: 'no-store',
        }
    ).then((res) => {
        if (!res.ok) {
            throw new Error('Ошибка при получении данных о фильме');
        }
        return res.json();
    });

    return (
        <div>
            <div className={'details'}>
            <div>
                {film.poster_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                        alt={film.title}
                        style={{width: '200px', borderRadius: '10px'}}
                    />
                )}
            </div>
                <div>
                    <h1>{film.title}</h1>
                    <p>Release Date: {film.release_date}</p>
                    <p>Budget: {film.budget}</p>
                    <p>Rating: {film.vote_average}</p>
                    <p>Genres: {film.genres.map(genre => genre.name).join(', ')}</p>
                    <p> Home page: <a href={film.homepage} target="_blank" rel="noopener noreferrer">{film.homepage}</a></p>
                    <p> Origin country: {film.origin_country}</p>
                    <p> Original language: {film.original_language}</p>
                    <p> Original title: {film.original_title}</p>
                    <p> Popularity: {film.popularity}</p>
                    <p> Production Companies: {film.production_companies.map(prodC => prodC.name).join(', ')}</p>
                    <p> Production Countries: {film.production_countries.map(prodCo => prodCo.name).join(', ')}</p>
                    <p> Revenue: {film.revenue}</p>
                    <p> Runtime: {film.runtime} minutes</p>
                    <p> Spoken Languages: {film.spoken_languages.map(spl => spl.name)}</p>
                    <p> Status: {film.status}</p>
                    <p> Tagline: {film.tagline}</p>


                </div>

            </div>
            <h2>Description:</h2>
            <p>{film.overview}</p>
        </div>
    );
};

export default ChoiseFilmByIdPage;
