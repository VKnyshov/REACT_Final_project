import React from 'react';
import Link from "next/link";
import "./MoviesList.css"

const HeaderComponent = () => {
    return (
        <div >
            <ul className="menu">
                    <li><Link href={'/'}>Movies List</Link></li>
                    <li><Link href={'/StarsRating'}>Stars Rating</Link></li>
                </ul>
            </div>
    );
};

export default HeaderComponent;