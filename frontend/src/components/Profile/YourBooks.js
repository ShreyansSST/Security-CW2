import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import IndividualYourBook from "./IndividualYourBook";

const YourBooks = () => {
  const { user, setUser } = useContext(UserContext);
  const [books, setBooks] = useState([]);

  const userId = user?.data[0].id;

  useEffect(() => {
    axios
      .get("http://localhost:3001/books", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [books]);

  // Filter books by the currently logged in user
  const filteredBooks = books.filter((book) => {
    return book.user.id === userId;
  });

  return (
    <div>
      {filteredBooks.length === 0 ? (
        <p className="font-medium text-center md-2:text-lg">
          Your haven't added any books{" "}
          <span className="text-purple-lighter">yet</span>.
        </p>
      ) : (
        <div className="grid items-stretch grid-cols-2 gap-6 vsm:grid-cols-3 sm:grid-cols-4 md-2:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {filteredBooks.map((book) => (
            <IndividualYourBook key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default YourBooks;
