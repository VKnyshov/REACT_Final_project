import React from 'react';
import {getMovies} from "@/services/api.service";
import {IMovie} from "@/models/types";
import "./startPage.css"
import Link from "next/link";

const StartPageComponent = async () => {
    const movies = await getMovies();
    console.log(movies)
    return (
        <>
            <div >
                <div>
                    {movies.length > 0 ? (
                        <div className="oneFilm">
                            {movies.map((movie: IMovie) => (
                                <div key={movie.id} className={'poster'}>

                                    <Link href={`/${movie.id}`} style={{textDecoration: "none"}}>

                                        {movie.poster_path ? (
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                            />
                                        ) : (
                                            <p>Изображение недоступно</p>
                                        )}

                                    </Link>

                                    <Link href={`/${movie.id}`} style={{textDecoration: "none"}}>
                                    <h4 style={{
                                        // color: 'lightyellow',

                                    }}>{movie.title}</h4>
                                    </Link>
                                </div>
                            ))}
                        </div>

                    ) : (
                        <p>Нет данных для отображения</p>
                    )}
                </div>

            </div>


        </>
    );
};

export default StartPageComponent;