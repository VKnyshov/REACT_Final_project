"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { getGenres } from "@/services/api.service";
import "./MoviesList.css";
import {IGenre} from "@/models/types";

const HeaderComponent = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [loading, setLoading] = useState(false);
    console.log(genres)
    const loadGenres = async () => {
        setLoading(true);
        const fetchedGenres = await getGenres();
        setGenres(fetchedGenres);
        setLoading(false);
    };

    useEffect(() => {
        loadGenres();
    }, []);

    return (
        <div className="header">
            <ul style={{ listStyleType: "none", padding: 0 }}>
                <li>
                    <Link href="/" style={{ textDecoration: "none", color: 'white' }}>Movies List</Link>
                </li>
                {loading ? (
                    <li>Loading...</li>
                ) : (
                    genres.map((genre) => (
                        <li key={genre.id}>
                            <Link href={`/genre/${genre.id}`} style={{ textDecoration: "none", color: 'white' }}
                            >{genre.name}</Link>
                        </li>

                    ))
                )}
            </ul>
        </div>
    );
};

export default HeaderComponent;
