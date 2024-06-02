import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../styles/MovieInfo.css'

function MovieInfo() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=d5a5a1ab`);
                const data = await response.json();
                setMovie(data);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
        fetchMovie();
    }, [id]);

    if (!movie) {
        return <div style={{ color: "white", textAlign: "center", fontSize: '2rem', marginTop: "200px" }}>Loading...</div>;
    }

    return (
        <div className="movie-info">
            <div className="poster">
                <img src={movie.Poster} alt={movie.Title} />
            </div>
            <div className="details">
                <h2>{movie.Title}</h2>
                <p><h3>Year:</h3> {movie.Year}</p>
                <p><h3>Rating:</h3> {movie.imdbRating}</p>
                <p><h3>Released:</h3> {movie.Released}</p>
                <p><h3>Runtime:</h3> {movie.Runtime}</p>
                <p><h3>Genre:</h3> {movie.Genre}</p>
                <p><h3>Director:</h3> {movie.Director}</p>
                <p><h3>Writer:</h3> {movie.Writer}</p>
                <p><h3>Actors:</h3> {movie.Actors}</p>
                <p><h3>Plot:</h3> {movie.Plot}</p>
                <p><h3>Language:</h3> {movie.Language}</p>
                <p><h3>Country:</h3> {movie.Country}</p>
                <p><h3>Awards:</h3> {movie.Awards}</p> <br />
                <Link to='/' className='btn'> Back</Link>
            </div>

        </div>
    );
}

export default MovieInfo;
