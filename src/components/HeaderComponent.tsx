import React from 'react';
import Link from "next/link";
import "./MoviesList.css"

const HeaderComponent = () => {
    return (
        <div className="header">


            <ul style={{ listStyleType: "none" }}>
                    <li><Link href={'/'} style={{textDecoration: "none", color: 'white'}}>Movies List</Link></li>
                    {/*<li><Link href={'/StarsRating'}>Stars Rating</Link></li>*/}
                </ul>
            </div>
    );
};

export default HeaderComponent;