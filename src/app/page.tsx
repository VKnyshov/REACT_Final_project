import React from 'react';
import MovieList from "@/components/MoviesList";
import "./globals.css"

export default async function Home() {
    return (
        <div>
            <MovieList/>
        </div>
    );
}
