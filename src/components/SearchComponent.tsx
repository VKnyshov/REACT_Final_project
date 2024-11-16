"use client";

import React, { useState } from 'react';

interface SearchComponentProps {
    onSearch: (query: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // створюємо обробник змінизначеньу інпуті
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchQuery(value);
        onSearch(value); // Передаємо запрос у атьківську компоненту
    };

    return (
        <div style={{ marginBottom: '20px' }}>
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
                }}
            />
        </div>
    );
};

export default SearchComponent;
