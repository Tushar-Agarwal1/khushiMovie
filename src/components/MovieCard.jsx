import React, { useState } from 'react'; 
import '../styles/MovieCard.css'
import MovieInfo from './MovieInfo';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
const MovieCard = ({ movie }) => { 
 const navigate= useNavigate()
    const [authuser] = useAuth();
    console.log(authuser)
    const userId = authuser ? authuser._id : null;
    const [isAdded, setIsAdded] = useState(false);
    const addToWatchlist = async (movieId) => {
        if(!authuser){
            toast.error("Login First", { duration: 1000 })
            setTimeout(() => {
                
                navigate('/login');
            }, 1000);
            return;
        }
     else {
        try {
            console.log(userId);
            const response = await axios.post('https://movieflix-backend-rj9a.onrender.com/watchlist/add', {
                userId: userId, 
                movieId: movieId
            });
            toast.success('Movie Added to WatchList!');
            console.log('movie added')
            setIsAdded(true);
            console.log(response.data); 
        } catch (error) {
            toast.error('Movie  Already Added to WatchList!');
            console.error('Error adding movie to watchlist:', error);

        }}
    }
    return ( 
        
        <div className="movie"> 
            <div> 
                {/* <p>{movie.Title}</p>  */}
            </div> 
            <div> 
                <img src={movie.Poster !== 'N/A' ? movie.Poster : "https://via.placeholder.com/400"} alt={movie.Title} /> 
            </div> 
            <div> 
                <span>{movie.Type}</span> 
                <h3>{movie.Title}</h3> 
              
                <Link to={`/#/info/${movie.imdbID}`} className='button'>View</Link>
                {!isAdded ? (

                    <button className='button' onClick={() => addToWatchlist(movie.imdbID)}>+ WatchList</button>
                ) : (
                    <button className='button'>Added ✅</button>
                )}
                {/* <Link to="/" className='button' onClick={() => addToWatchlist(movie.imdbID)}>+ WatchList</Link> */}
            </div> 
        </div> 
    ) 
} 
export default MovieCard;
