import axios from "axios";
import React, { useContext, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TotalBooksContext } from "../../context/TotalBooksContext";
import UpdateBookModal from "../modal/UpdateBookModal";

const IndividualYourBook = ({ book }) => {
  const { totalBooks, updateTotalBooks } = useContext(TotalBooksContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsHovered(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = () => {
    axios
      .delete(`http://localhost:3001/books/${book._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        console.log("Book deleted successfully!");
      })
      .catch((error) => {
        console.log(error);
      });

    updateTotalBooks(totalBooks - 1);
  };

  return (
    <div>
      <div
        className="cursor-pointer relative w-fit bg-dark-slate-85 dark:bg-black-75 p-4 rounded-lg flex flex-col gap-4 transition duration-200"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          src={`http://localhost:3001/uploads/${book.bookCover}`}
          alt=""
          className="rounded-lg w-[120px] h-[170px] object-fill"
        />

        <div className="flex flex-col gap-1">
          <p className="text-sm text-center font-medium leading-[1.3]">
            {book.title}
          </p>

          <p className="text-sm text-center font-light leading-[1.3]">
            {book.author}
          </p>
        </div>

        {isHovered && (
          <div className="bg-[#000000aa] w-full h-full absolute top-0 left-0 rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-4">
              <button onClick={handleEditClick}>
                <FaEdit className="w-6 h-6 text-white transition duration-300 hover:text-purple-lighter" />
              </button>

              <div onClick={handleDeleteClick}>
                <BsTrash className="w-6 h-6 text-white transition duration-300 hover:text-purple-lighter" />
              </div>
            </div>
          </div>
        )}
      </div>

      {isModalOpen && (
        <UpdateBookModal closeModal={handleCloseModal} book={book} />
      )}

      {isDeleteModalOpen && (
        <div className="bg-[#000000cb] text-white fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center">
          {/* Delete confirmation modal */}
          <div className="modal relative w-full max-w-xl overflow-auto">
            <div className="relative py-10 mx-5 bg-black-75 p-4 rounded-xl shadow dark:bg-gray-700">
              <button className="absolute top-3 right-4">
                <IoClose
                  onClick={handleCloseDeleteModal}
                  className="w-7 h-7 text-white transition duration-300 hover:text-red"
                />
              </button>

              <p className="text-2xl font-medium text-center mb-4">
                Delete Book
              </p>

              <p className="text-sm text-center">
                Are you sure you want to delete this book?
              </p>

              <div className="flex justify-center gap-6 mt-6">
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-lg bg-purple-lighter text-black text-base font-medium transition duration-300 hover:bg-purple-lighter-hover"
                >
                  Confirm Delete
                </button>

                <button
                  onClick={handleCloseDeleteModal}
                  className="px-4 py-2 rounded-lg bg-gray-500 text-white text-base font-medium transition duration-300 hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualYourBook;
