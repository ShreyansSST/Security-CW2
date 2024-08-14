import React, { useContext, useEffect, useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { IoBook, IoTime } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import { getTimeDifference } from "../../utils/dateUtils";
import ExchangeRequestModal from "../modal/ExchangeRequestModal";
import axios from "axios";

const BookDetails = ({ userInfo, fetchUserInfo, book, openModal }) => {
  const { title, author, genre, language, description, imageUrl, user } = book;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user: currentUser } = useContext(UserContext);

  useEffect(() => {
    if (user.id) {
      fetchUserInfo(user.id);
    }
  }, [fetchUserInfo, user.id]);

  const handleExchangeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-5 mb-16 flex flex-col gap-6 md:flex-row md:gap-8 md-2:mb-5">
      <div className="min-w-fit flex items-center justify-center gap-4 md:flex-col md:items-start md:justify-start">
        {/* <div className="max-w-[150px] md:max-w-[180px]">
          <img
            src={`https://localhost:3001/uploads/${book.bookCover}`}
            alt=""
            className="rounded-lg h-[250px] object-fill"
          />
        </div> */}

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              src={
                userInfo?.image
                  ? `https://localhost:3001/uploads/${userInfo?.image}`
                  : "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png"
              }
              alt=""
              className="w-[30px] h-[30px] rounded-full object-fill"
            />

            <p className="text-sm">@{userInfo?.username}</p>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center">
              <IoTime className="w-4 h-4" />

              <p className="text-sm text-black dark:text-dark-slate-85 font-light">
                Posted {getTimeDifference(book.date)}
              </p>
            </div>
          </div>

          {currentUser?.data[0]?.userType !== "admin" ? (
            <button
              className="bg-purple-lighter rounded-lg text-black font-semibold px-4 py-1.5 transition duration-300 hover:bg-purple-lighter-hover vsm:px-6"
              onClick={handleExchangeClick}
            >
              Request Exchange
            </button>
          ) : (
            <button
              className="bg-purple-lighter rounded-lg text-black font-semibold px-4 py-1.5 transition duration-300 hover:bg-purple-lighter-hover vsm:px-6"
              onClick={
              async (e) => {
                e.stopPropagation();
                try {
                  const token = localStorage.getItem("token");
                  await axios.delete(`https://localhost:3001/books/${book._id}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });

                  window.location.reload();
                } catch (error) {
                  console.log(error);
                }
              }
            }
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8 md:items-start">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="font-light">{author}</p>
          </div>

          <div className="flex flex-col gap-3">
            {/* <div className="flex gap-2">
              <BsStarFill className="w-5 h-5 text-pale-yellow" />
              <p className="font-medium">4.8/5</p>
            </div> */}
            <div className="flex gap-2">
              <IoBook className="w-5 h-5 text-pale-green" />
              <p className="font-medium">{genre}</p>
            </div>
            <div className="flex gap-2">
              <BsGlobe className="w-5 h-5 text-pale-green" />
              <p className="font-medium">{language}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold">Synopsis</h2>

          <p>{description}</p>
        </div>
      </div>

      {isModalOpen && (
        <ExchangeRequestModal closeModal={handleCloseModal} book={book} />
      )}
    </div>
  );
};

export default BookDetails;
