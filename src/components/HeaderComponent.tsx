"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { getGenres } from "@/services/api.service";
import "./MoviesList.css";
import {IGenre} from "@/models/types";

const HeaderComponent = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [loading, setLoading] = useState(false);
    const loadGenres = async () => {
        setLoading(true);
        const fetchedGenres = await getGenres();
        setGenres(fetchedGenres);
        setLoading(false);
    };

    useEffect(() => {
        loadGenres().catch((error) => console.error("Помилка при завантажені жанрів:", error));
    }, []);

    return (
        <div className="header">

            <ul style={{listStyleType: "none", padding: 0}}>
                <Link href="/" style={{textDecoration: "none", color: 'white', textAlign: 'center'}}>
                    <li>
                        All Movies
                    </li>
                </Link>
                {
                    loading ? (
                    <li>Loading...</li>
                ) : (
                    genres.map((genre) => (<div key={genre.id}>
                            <Link href={`/genre/${genre.id}`}
                                  style={{textDecoration: "none", color: 'white', textAlign: 'center'}}>
                                <li key={genre.id}>{genre.name}</li>
                            </Link>
                        </div>
                    ))
                )
                }
                <p style={{
                    color: 'rgb(0, 255, 255, 0.2)',
                    padding: '20px',
                    fontSize: '10px',
                    height: '15px',
                    fontStyle:'italic'}}> &#174;by VKnyshov  - stydent of the `OKTEN school`</p>
            </ul>
        </div>
    );
};

export default HeaderComponent;