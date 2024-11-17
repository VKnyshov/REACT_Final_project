"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import '@/components/MoviesList.css';
import { IFilm } from "@/models/types";
import {getMovieById} from "@/services/api.service";

const MoviesListCard = () => {
    const { id } = useParams();
    const [film, setFilm] = useState<IFilm | null>(null);

    const RatingStars = ({ rating }: { rating: number }) => {
        const MAX_STARS = 10;
        const filledStars = Math.round(rating); // заокруглюємо до найближчого

        return (
            <div className="star-rating">
                {[...Array(MAX_STARS)].map((_, index) => (
                    <span key={index} className={`star-rating__star ${index < filledStars ? 'is-selected' : ''}`}> ★</span>
                ))}
            </div>
        );
    };

    useEffect(() => {
        void (async () => {
            if (id) {
                const movieData = await getMovieById(Number(id));
                setFilm(movieData);
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
                    <p style={{paddingBottom: '20px'}}> Tagline: {film.tagline}</p>

                    <div style={{paddingBottom:'20px'}}>
                        <h4>Rating ({film.vote_average}):</h4>
                        <RatingStars rating={film.vote_average}/>
                    </div>

                    <p>Release Date: {film.release_date}</p>
                    <p>Budget: {film.budget}</p>
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
                </div>

            </div>
            <h2 style={{color: 'white', padding: '1% 10%'}}>Description:</h2>
            <p style={{color:'white', padding:'1% 10%'}}>{film.overview}</p>
        </div>
    );
};

export default MoviesListCard;
