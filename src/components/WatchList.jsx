import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import '../styles/Watchlist.css'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [authuser] = useAuth(); 
  const userId = authuser ? authuser._id : null; 
const [change,setchange]= useState(false);

  useEffect(() => {
    if (!userId) return; 
    axios.get(`https://movieflix-backend-rj9a.onrender.com/watchlist/${userId}`)
      .then(response => {
        console.log(response.data);
        setWatchlist(response.data);
      })
      .catch(error => {
        console.error('Error fetching watchlist:', error);
      });
  }, [change,userId]); 

  const removeFromWatchlist = async (movieId) => {
   await axios.post('https://movieflix-backend-rj9a.onrender.com/watchlist/remove', { userId: userId, movieId: movieId })
      .then(response => {
        console.log(response.data);
        setchange(prevChange => !prevChange); 
        toast.success("Movie removed from WatchList", { duration: 1000 })
        // setTimeout(() => {
        //    window.location.reload();
        // }, 1000);
      })
      .catch(error => {
        console.error('Error removing movie from watchlist:', error);
      });
  }
  
  const fetchMovieDetails = async (imdbID) => {
    try {
        const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=d5a5a1ab`);
      console.log(response.data);
      return response.data;
    
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };

useEffect(() => {
    
    Promise.all(watchlist.map(movieId => fetchMovieDetails(movieId)))
      .then(movieDetails => {
        setMovieDetails(movieDetails.filter(movie => movie !== null)); // Filter out null values
      });
  }, [watchlist]);

  return (
    <div className='watch-container'>
      <h2 className='watch-heading'>My Watchlist</h2>
      <ul>
        {movieDetails.map(movie => (
          <li key={movie.imdbID}>
            <div className='watch-details'>
             {movie.Title}<br />
        <img src={movie.Poster} alt="" /> <br />
           <p> <strong>Year:</strong> {movie.Year}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
              {/* Add other movie details here */}
            </div>
            <Link to={`/info/${movie.imdbID}`} className='remove-btn'>View</Link>
            <button className="remove-btn" onClick={() => removeFromWatchlist(movie.imdbID)}>Remove</button>
          </li>
        ))}
      </ul>
      <Link to='/' className='watch-backbtn'>Back</Link>
    </div>
  );
}

export default Watchlist;
