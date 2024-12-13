import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-full p-1 bg-gray-100 dark:bg-gray-800">
      <BiSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Search chats..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="flex-1 outline-none p-2 bg-transparent rounded-full dark:text-white"
      />
    </div>
  );
};

export default Search;