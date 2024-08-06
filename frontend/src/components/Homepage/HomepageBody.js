import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FiTrendingUp } from "react-icons/fi";
import { IoTime } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import Book from "./Book";

const HomepageBody = ({ handleBookClick, userInfo, fetchUserInfo }) => {
  const { user } = useContext(UserContext);
  const [books, setBooks] = useState([]);

  console.log(user);

  useEffect(() => {
    axios
      .get("http://localhost:3001/books", {})
      .then((response) => setBooks(response.data.data))
      .catch((error) => console.log(error));
  }, []);

  // Filter books array to show only posts of other people
  const filteredBooks = books.filter(
    (book) => book.user.id !== user?.data[0].id
  );

  return (
    <div className="mt-5 mb-16 flex flex-col gap-6 md-2:mb-5">
      {books.length > 0 && (
        <>
          <div className="flex items-center gap-2 font-medium vsm:gap-4">
            <button className="text-sm flex items-center gap-1 bg-purple-lighter-white-80 dark:bg-black-75 border border-purple-lighter-white-80 dark:border-black-75 px-2 py-1.5 rounded-md vsm:px-3 vsm:text-base">
              <IoTime className="w-4 h-4 vsm:w-5 vsm:h-5" />
              Recently Added
            </button>

            <button className="text-sm flex items-center gap-1 bg-none border border-purple-lighter-white-80 dark:border-black-75 px-2 py-1.5 rounded-md transition duration-300 hover:bg-purple-lighter-white-80 dark:hover:bg-black-75 vsm:px-3 vsm:text-base">
              <FiTrendingUp className="w-4 h-4 vsm:w-5 vsm:h-5" />
              Most Popular
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 md:gap-8 2xl:grid-cols-3">
            {filteredBooks.length === 0 ? (
              <div>
                <p className="font-medium">
                  No <span className="text-purple-lighter">books</span>{" "}
                  available. 😟
                </p>
              </div>
            ) : (
              filteredBooks.map((book, index) => (
                <Book
                  key={index}
                  book={book}
                  handleBookClick={handleBookClick}
                  userInfo={userInfo}
                  fetchUserInfo={fetchUserInfo}
                />
              ))
            )}
          </div>
        </>
      )}

      {/* {
        user === null && (
          <div className="absolute top-0 left-0 h-[100vh] w-screen bg-black"></div>
        )
      } */}
    </div>
  );
};

export default HomepageBody;
