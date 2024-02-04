import React, { useState } from 'react';

const SearchBar = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className='text-white text-2xl font-bold flex items-center'>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={handleChange}
        className="mr-2 p-2 rounded border outline-none"
      />
      <button type="submit" className='text-white text-2xl font-bold p-3' >
        Search
      </button>
    </form>
  );
};

export default SearchBar;