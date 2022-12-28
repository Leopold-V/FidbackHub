import React, { useState } from 'react';

const Searchbar = ({ items /*onSearch*/ }) => {
  const [query, setQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    setFilteredItems(items.filter((item) => item.toLowerCase().includes(value.toLowerCase())));
  };

  const handleSelect = (event) => {
    setQuery(event.target.innerText);
    setFilteredItems(items);
    //onSearch(event.target.innerText);
  };

  return (
    <div className="relative rounded-md shadow-sm">
      <input
        type="search"
        className="form-input py-2 pl-10 pr-4 block w-full leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      {query.length > 0 && (
        <ul className="absolute z-50 w-full bg-white rounded-md shadow-lg mt-1">
          {filteredItems.map((item) => (
            <li
              key={item}
              className="block px-4 py-2 hover:bg-gray-200 rounded-md cursor-pointer"
              onClick={handleSelect}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
