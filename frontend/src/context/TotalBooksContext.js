import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const TotalBooksContext = createContext();

export const TotalBooksProvider = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const [totalBooks, setTotalBooks] = useState(0);

  const updateTotalBooks = (count) => {
    setTotalBooks(count);
  };

  useEffect(() => {
    const fetchTotalBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/books", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const books = response.data.data;
        const userBooks = books.filter(
          (book) => book.user.id === user?.data[0].id
        );
        setTotalBooks(userBooks.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTotalBooks();
  }, [user, totalBooks]);

  return (
    <TotalBooksContext.Provider value={{ totalBooks, updateTotalBooks }}>
      {children}
    </TotalBooksContext.Provider>
  );
};
