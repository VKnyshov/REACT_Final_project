import React from 'react';
import StartPageComponent from "@/components/MoviesList";
import "./globals.css"

export default async function Home() {
    return (
        <div>
            <StartPageComponent/>
        </div>
    );
}
