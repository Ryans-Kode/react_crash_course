import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import SearchIcon from "./search.svg";
import './App.css';



const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [movies, setMoives] = useState([]);
  const [searchTerms, setSearchTerms] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMoives(data.Search);
  };


  useEffect(() => {
    searchMovies('ufo');
  },[]);

  return(
    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input
        placeholder="Search for movies"
        value={searchTerms}
        onChange={(e) => setSearchTerms(e.target.value)}
        onKeyDown={(e) => {
          if (e.code ==='Enter') 
           return searchMovies(searchTerms)
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerms)}
        />
      </div>

      {movies?.length > 0 
        ? (
          <div className='container'>
            {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
        ) : (  
          <div className='empty'>
           <h2>No moives found</h2>
          </div> 
        )};
    </div>
    );
  }

export default App; 