import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { UserContext } from "../../context/UserContext";

const IndividualFavouriteBook = ({ bookId, userInfo, fetchUserInfo }) => {
  const [book, setBook] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user: currentUser, setUser } = useContext(UserContext);

  useEffect(() => {
    if (currentUser) {
      setIsBookmarked(currentUser?.data[0].bookmarkedBooks.includes(bookId));
    }
  }, [currentUser, bookId]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [bookId]);

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle case when user is not logged in
        return;
      }

      if (isBookmarked) {
        // Remove bookmark
        await axios.delete(`http://localhost:3001/books/bookmark/${bookId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser((prevUser) => {
          const updatedBookmarkedBooks =
            prevUser?.data[0].bookmarkedBooks.filter(
              (bookid) => bookid !== bookId
            );
          return {
            ...prevUser,
            data: [
              {
                ...prevUser.data[0],
                bookmarkedBooks: updatedBookmarkedBooks,
              },
            ],
          };
        });
        setIsBookmarked(false);
      } else {
        // Add bookmark
        await axios.post(
          `http://localhost:3001/books/bookmark/${bookId}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser((prevUser) => {
          const updatedBookmarkedBooks = [
            ...prevUser?.data[0].bookmarkedBooks,
            bookId,
          ];
          return {
            ...prevUser,
            data: [
              {
                ...prevUser.data[0],
                bookmarkedBooks: updatedBookmarkedBooks,
              },
            ],
          };
        });
        setIsBookmarked(true);
      }
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  return (
    <div className="cursor-pointer relative w-fit bg-dark-slate-85 dark:bg-black-75 p-4 pt-12 rounded-lg flex flex-col gap-4 transition duration-200">
      <button className="absolute top-3 right-2" onClick={handleBookmarkClick}>
        {isBookmarked ? (
          <BsBookmarkFill className="w-5 h-5 cursor-pointer text-black-75 transition duration-300 dark:text-white" />
        ) : (
          <BsBookmark className="w-5 h-5 cursor-pointer text-black-75 transition duration-300 dark:text-white" />
        )}
      </button>

      <img
        src={
          book?.data && book?.data[0] && book?.data[0].bookCover
            ? `http://localhost:3001/uploads/${book?.data[0].bookCover}`
            : "https://cdn.vectorstock.com/i/preview-1x/82/99/no-image-available-like-missing-picture-vector-43938299.jpg"
        }
        alt=""
        className="rounded-lg w-[120px] h-[170px] object-fill"
      />

      {book?.data && book?.data.length > 0 ? (
        <div className="flex flex-col gap-1">
          {/* Mapping through the array to display titles and authors */}
          {book.data.map((item) => (
            <React.Fragment key={item._id}>
              <p className="text-sm text-center font-medium leading-[1.3]">
                {item.title}
              </p>

              <p className="text-sm text-center font-extralight leading-[1.3]">
                {item.author}
              </p>
            </React.Fragment>
          ))}

          <div className="flex items-center gap-1 mt-1">
            <img
              src={
                userInfo?.image
                  ? `http://localhost:3001/uploads/${userInfo?.image}`
                  : "https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              }
              alt=""
              className="w-[20px] h-[20px] rounded-full object-fill"
            />

            <p className="text-xs">@{book?.data[0].user?.username}</p>
          </div>
        </div>
      ) : (
        <div class="flex items-center justify-center h-12 w-12 border-t-4 border-pale-green border-solid rounded-full animate-spin"></div>
      )}
    </div>
  );
};

export default IndividualFavouriteBook;
