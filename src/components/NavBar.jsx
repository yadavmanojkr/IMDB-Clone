import React from 'react'
import Logo from './imdb_a.webp'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar';

function NavBar({ handleSearch }) {
  return (
    <div className='flex space-x-8 item-center p-3 m-2'>
      <img className="w-[50px] rounded-2xl" src={Logo} />
      <Link to='/' className='text-white text-2xl font-bold p-3'>Movies</Link>
      <Link to='Watchlist' className='text-white text-2xl font-bold p-3'>Watchlist</Link>

      <SearchBar handleSearch={handleSearch} />

    </div>
  )
}

export default NavBar;