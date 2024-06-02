import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import '../styles/Hero.css'
const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=d5a5a1ab';

function Hero() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Change here

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Hey');
    }, []);
    return (
        <div className='hero'>

            <div className="search">
                <input
                    placeholder="Search for Movies"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value) }}
                />
                <img
                    src="https://media.geeksforgeeks.org/wp-content/uploads/20230626112934/search.png"
                    alt="search icon"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                    ? (<div className="container">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie} />
                        ))}
                    </div>) : (
                        <div className="empty">
                            <h2>No Movies found</h2>
                        </div>
                    )
            }
        </div>
    )
}

export default Hero