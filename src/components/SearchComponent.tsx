"use client";

import React, {useState} from 'react';

interface SearchComponentProps {
    onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({onSearch}) => {
    const [searchQuery, setSearchQuery] = useState('');


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        onSearch(value);
    };

    return (
        <div style={{marginBottom: '20px'}}>
            <input
                type="text"
                placeholder="Enter the movie title..."
                value={searchQuery}
                onChange={handleInputChange}
                style={{
                    padding: '10px',
                    margin: '1% 0 0 64%',
                    width: '100%',
                    maxWidth: '300px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    background: 'rgb(79, 15, 19,0.9)',
                    color: 'white',
                }}
            />
        </div>
    );
};

export default SearchComponent;
