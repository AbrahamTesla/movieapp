import React, { useEffect, useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

const API_URL = ' https://www.omdbapi.com/?i=tt3896198&apikey=aede9dbb';

// const movie1 = {
//    Title: 'Batman v Superman: Dawn of Justice',
//    Year: '2016',
//    imdbID: 'tt2975590',
//    Type: 'movie',
//    Poster:
//       'https://m.media-amazon.com/images/M/MV5BYThjYzcyYzItNTVjNy00NDk0LTgwMWQtYjMwNmNlNWJhMzMyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
// };
function App() {
   const [movies, setMovies] = useState([]);
   const [searchTitle, setSearchTitle] = useState('');

   const searchMovies = async title => {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      setMovies(data.Search);
      console.log(data.Search);
   };

   useEffect(() => {
      searchMovies('superman');
   }, []);

   return (
      <div className='App'>
         <h1>Movie App</h1>
         <div className='search'>
            <input
               type='text'
               placeholder='Search for Movies'
               value={searchTitle}
               onChange={e => {
                  setSearchTitle(e.target.value);
               }}
            />
            <img
               src={SearchIcon}
               alt='search'
               onClick={() => {
                  searchMovies(searchTitle);
               }}
            />
         </div>
         {movies?.length > 0 ? (
            <div className='container'>
               {movies.map((movie, index) => (
                  <MovieCard movie={movie} key={index} />
               ))}
            </div>
         ) : (
            <div className='empty'>
               <h2>No Movies Found</h2>
            </div>
         )}
      </div>
   );
}

export default App;
