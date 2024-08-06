import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { HiBookOpen, HiDocumentText, HiGlobe, HiLibrary, HiMail, HiUser } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { RxUpload } from "react-icons/rx";
import { TotalBooksContext } from "../../context/TotalBooksContext";
import { UserContext } from "../../context/UserContext";
import TextFieldWithLabel from "../Login-Signup/TextFieldWithLabel";

const AddBookModal = ({ closeModal }) => {
  const { setUser, isLoading, setIsLoading } = useContext(UserContext);
  const { totalBooks, updateTotalBooks } = useContext(TotalBooksContext);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [language, setLanguage] = useState("");
  const [description, setDescription] = useState("");
  const [bookCover, setBookCover] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleBookCoverChange = (e) => {
    setBookCover(e.target.files[0]);
    setSelectedFileName(e.target.files[0].name);
  };

  const handleAddBook = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Upload the book cover first
      const formData = new FormData();
      formData.append("profilePicture", bookCover);

      const response = await axios.post(
        "http://localhost:3001/books/uploadBookCover",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const { filename } = response.data;

      console.log(filename);

      // Add the book with the uploaded book cover
      await axios.post(
        "http://localhost:3001/books",
        {
          title,
          author,
          genre,
          language,
          description,
          bookCover: filename,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Book added successfully.");
      closeModal();
      updateTotalBooks(totalBooks + 1);
    } catch (error) {
      console.log(error);
      setError("Failed to add book.");
    } finally {
      setIsLoading(false);
      setTitle("");
      setAuthor("");
      setGenre("");
      setLanguage("");
      setDescription("");
      setBookCover(null);
      setError("");
    }
  };

  const inputRef = useRef(null);

  const handleDivClick = () => {
    inputRef.current.click();
  };

  const handleReset = () => {
    setTitle("");
    setAuthor("");
    setGenre("");
    setLanguage("");
    setDescription("");
    setBookCover(null);
  };

  return (
    <div className="bg-[#000000cb] text-black dark:text-white fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center">
      <div className="modal relative w-full max-w-2xl overflow-auto">
        <div className="relative my-10 mx-5 bg-light-bg dark:bg-black-75 p-4 rounded-xl shadow dark:bg-gray-700">
          <button className="absolute top-3 right-4">
            <IoClose
              onClick={closeModal}
              className="w-7 h-7 text-black dark:text-white"
            />
          </button>

          {error && <span className="text-pale-red">{error}</span>}

          {message && <span className="text-pale-green">{message}</span>}

          <form className="my-6 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4 md:gap-y-6">
            <div className="flex flex-col items-baseline gap-2">
              <label className="font-medium">Book Cover</label>
              <div
                onClick={handleDivClick}
                className="relative cursor-pointer bg-purple-lighter w-full h-28 md:h-full"
              >
                <div className="w-full h-full flex items-center justify-center gap-2 bg-[#ffffff70] dark:bg-[#00000070]">
                  {selectedFileName ? (
                    <p>{selectedFileName}</p>
                  ) : (
                    <>
                      <label>
                        <RxUpload className="cursor-pointer text-2xl text-black dark:text-white" />
                      </label>
                      <p className="font-medium">Choose book cover</p>
                    </>
                  )}

                  <input
                    ref={inputRef}
                    type="file"
                    src=""
                    alt=""
                    id="image"
                    name="bookCover"
                    className="w-6 h-6 invisible absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    onChange={handleBookCoverChange}
                  />
                </div>
              </div>
            </div>

            <TextFieldWithLabel
              label="Book Name"
              type="text"
              placeholder="Enter book name"
              icon={HiBookOpen}
              onChange={handleTitleChange}
            />

            <TextFieldWithLabel
              label="Author Name"
              type="text"
              placeholder="Enter author name"
              icon={HiUser}
              onChange={handleAuthorChange}
            />

            <TextFieldWithLabel
              label="Genre"
              type="text"
              placeholder="Enter genre(s)"
              icon={HiLibrary}
              onChange={handleGenreChange}
            />

            <TextFieldWithLabel
              label="Language"
              type="text"
              placeholder="Enter book language"
              icon={HiGlobe}
              onChange={handleLanguageChange}
            />

            <TextFieldWithLabel
              label="Description"
              type="text"
              placeholder="Enter book description"
              icon={HiDocumentText}
              onChange={handleDescriptionChange}
            />

            <div className="flex items-center justify-between md:col-span-2">
              <button
                type="button"
                className="w-fit mt-4 bg-black dark:bg-dark-slate text-white text-sm px-4 py-2 rounded-[2px] vsm:text-base md:mt-8"
                onClick={handleReset}
              >
                Reset
              </button>

              <button
                type="submit"
                className="w-fit mt-4 bg-purple-lighter text-black font-semibold text-sm px-4 py-2 rounded-[2px] vsm:text-base md:mt-8"
                onClick={handleAddBook}
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
