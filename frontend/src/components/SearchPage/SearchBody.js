import axios from "axios";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import SearchIllustration from "../../assets/images/search.png";
import Book from "../Homepage/Book";

const SearchBody = ({ userInfo, fetchUserInfo, handleBookClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (event) => {
    event.preventDefault();

    if (searchQuery.trim() === "") {
      // Empty search query, clear the results
      setSearchResults([]);
      setSearchPerformed(false);
      return;
    }

    axios
      .get(`http://localhost:3001/books/search?query=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setSearchResults(response.data.data);
          setSearchPerformed(true);
        } else {
          setSearchResults([]);
          setSearchPerformed(true);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <form
      className="mt-5 mb-16 flex flex-col gap-8 md-2:mb-5"
      onSubmit={handleSearch}
    >
      <div className="bg-dark-slate-85 dark:bg-black-75 flex items-center justify-between gap-2 px-4 py-2 rounded-full vsm:gap-4">
        <input
          type="text"
          placeholder="Search books by title, author or ISBN number"
          className="w-full bg-dark-slate-85 dark:bg-black-75 outline-none placeholder:font-light"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className="focus:outline-none" onClick={handleSearch}>
          <FiSearch className="w-5 h-5" />
        </button>
      </div>

      {searchPerformed ? (
        searchResults.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              src={SearchIllustration}
              alt=""
              className="w-[70vw] max-w-[300px]"
            />
            <p className="font-medium md-2:text-lg">No search results found.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 md:gap-8 2xl:grid-cols-3">
            {searchResults.map((book, index) => (
              <Book
                key={index}
                book={book}
                handleBookClick={handleBookClick}
                userInfo={userInfo}
                fetchUserInfo={fetchUserInfo}
              />
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center gap-4">
          <img
            src={SearchIllustration}
            alt=""
            className="w-[70vw] max-w-[300px]"
          />
          <p className="font-medium md-2:text-lg">
            Your <span className="text-purple-lighter">searches</span> will
            appear here.
          </p>
        </div>
      )}
    </form>
  );
};

export default SearchBody;
