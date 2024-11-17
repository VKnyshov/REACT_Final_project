"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '@/components/MoviesList.css';
import { IFilm } from "@/models/types";

const MoviesListCard = () => {
    const { id } = useParams();
    const [film, setFilm] = useState<IFilm | null>(null);

    useEffect(() => {
        // щоб игнорувати порміс, що повертається, огорну   визов у void
        void (async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=b7a298a0b1d758ea17900529441798b0`,
                    {
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                        },
                        cache: 'no-store',
                    }
                );

                if (response.ok) {
                    const data = await response.json();
                    setFilm(data);
                } else {
                    console.error('Помилка приотриманні данних фільма');
                }
            } catch (error) {
                console.error('Помилка завантаження фільму:', error);
            }
        })();
    }, [id]);

    if (!film) {
        return <div>Loading...</div>;
    }



    return (
        <div>

            <div className={'details'}>
                                 <div>
                {film.poster_path && (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${film.poster_path}`}
                            alt={film.title}
                            style={{width: '250px', borderRadius: '10px'}}
                        />
                    )}
                </div>
                <div>
                    <h1>{film.title}</h1>
                    <p>Release Date: {film.release_date}</p>
                    <p>Budget: {film.budget}</p>
                    <p>Rating: {film.vote_average}</p>
                    <p>Genres: {film.genres.map(genre => genre.name).join(', ')}</p>
                    <p> Home page: <a href={film.homepage}>{film.homepage}</a></p>
                    <p> Origin country: {film.origin_country}</p>
                    <p> Original language: {film.original_language}</p>
                    <p> Original title: {film.original_title}</p>
                    <p> Popularity: {film.popularity}</p>
                    <p> Production Companies: {film.production_companies.map(prodC => prodC.name).join(', ')}</p>
                    <p> Production Countries: {film.production_countries.map(prodCo => prodCo.name).join(', ')}</p>
                    <p> Revenue: {film.revenue}</p>
                    <p> Runtime: {film.runtime} minutes</p>
                    <p> Spoken Languages: {film.spoken_languages.map(spl => spl.name).join(', ')}</p>
                    <p> Status: {film.status}</p>
                    <p> Tagline: {film.tagline}</p>
                </div>

            </div>
            <h2 style={{color:'white', padding: '1% 10%'}}>Description:</h2>
            <p style={{color:'white', padding:'1% 10%'}}>{film.overview}</p>
        </div>
    );
};

export default MoviesListCard;
