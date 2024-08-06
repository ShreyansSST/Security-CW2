import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSwap } from "react-icons/ai";
import { BsBookmark, BsBookmarkFill, BsTrash } from "react-icons/bs";
import { IoTime } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { getTimeDifference } from "../../utils/dateUtils";

const Book = ({ book, handleBookClick, fetchUserInfo, userInfo }) => {
  const { title, author, imageUrl, user } = book;
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { user: currentUser, setUser } = useContext(UserContext);
  const [exchangeRequestCount, setExchangeRequestCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      fetchUserInfo(user.id);
    }
  }, [fetchUserInfo, user.id]);

  useEffect(() => {
    if (currentUser) {
      setIsBookmarked(currentUser?.data[0].bookmarkedBooks.includes(book._id));
    }
  }, [currentUser, book._id]);

  useEffect(() => {
    const fetchExchangeRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:3001/exchange/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const exchangeRequests = response.data;
        const count = exchangeRequests.filter(
          (request) => request.requestedBook._id === book._id
        ).length;
        setExchangeRequestCount(count);
      } catch (error) {
        console.log(error);
      }
    };

    fetchExchangeRequests();
  }, [book._id]);

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
        await axios.delete(`http://localhost:3001/books/bookmark/${book._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser((prevUser) => {
          const updatedBookmarkedBooks =
            prevUser?.data[0].bookmarkedBooks.filter(
              (bookId) => bookId !== book._id
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
          `http://localhost:3001/books/bookmark/${book._id}`,
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
            book._id,
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

  const handleClick = () => {
    if (currentUser) {
      handleBookClick(book);
    } else {
      // setShowModal(true);
      navigate("/please-login");
    }
  };

  return (
    <div
      className="cursor-pointer relative w-full h-[350px] bg-dark-slate-85 dark:bg-black-75 rounded-xl vsm:h-[300px] transition duration-200 hover:scale-[1.01]"
      onClick={handleClick}
    >
      <div
        className="bg-no-repeat bg-cover bg-center rounded-t-xl w-full h-[50%]"
        style={{
          backgroundImage: `url(${`http://localhost:3001/uploads/${book.bookCover}`})`,
        }}
      >
        <div className="absolute w-full h-[50%] bg-[#00000098] rounded-t-xl"></div>

        <div className="relative flex items-center justify-between p-3 z-10">
          <div className="flex items-center gap-2">
            {/* <img
              src={
                userInfo?.image
                  ? `http://localhost:3001/uploads/${userInfo?.image}`
                  : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
              }
              alt=""
              className="w-[30px] h-[30px] rounded-full object-fill"
            /> */}

            <p className="text-sm text-white">@{book.user.username}</p>
          </div>

          {currentUser?.data[0]?.userType !== "admin" ? (
            <button onClick={handleBookmarkClick}>
              {isBookmarked ? (
                <BsBookmarkFill className="w-5 h-5 cursor-pointer text-white transition duration-300" />
              ) : (
                <BsBookmark className="w-5 h-5 cursor-pointer text-white transition duration-300" />
              )}
            </button>
          ) : (
            <button onClick={
              async (e) => {
                e.stopPropagation();
                try {
                  const token = localStorage.getItem("token");
                  await axios.delete(`http://localhost:3001/books/${book._id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });

                  window.location.reload();
                } catch (error) {
                  console.log(error);
                }
              }
            }>
              <BsTrash className="w-5 h-5 cursor-pointer text-white transition duration-300" />
            </button>
          )}
        </div>
      </div>

      <div className="h-[50%]">
        <div className="relative left-[104px] my-1.5">
          <h2 className="text-base font-medium vsm:text-lg">{title}</h2>
          <p className="text-sm font-light vsm:text-base">{author}</p>
        </div>

        <div className="flex flex-col gap-4 justify-between p-3 vsm:flex-row vsm:gap-1 vsm:items-center">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2 items-center">
              <AiOutlineSwap className="w-5 h-5" />

              <p className="text-black dark:text-dark-slate-85 font-light">
                Requested{" "}
                <span className="text-lg font-semibold text-purple-lighter">
                  {exchangeRequestCount}
                </span>{" "}
                times
              </p>
            </div>

            <div className="flex gap-1 items-center">
              <IoTime className="w-4 h-4" />

              <p className="text-sm text-black dark:text-dark-slate-85 font-light">
                Posted {getTimeDifference(book.date)}
              </p>
            </div>
          </div>

          <button className="bg-purple-lighter rounded-lg text-black font-semibold px-4 py-1.5 transition duration-300 hover:bg-purple-lighter-hover vsm:px-6">
            View Details
          </button>
        </div>
      </div>

      <div className="absolute top-1/2 left-3 -translate-y-1/2">
        <img
          src={`http://localhost:3001/uploads/${book.bookCover}`}
          alt=""
          className="w-[80px] h-[120px] rounded-lg object-fill"
        />
      </div>
    </div>
  );
};

export default Book;
