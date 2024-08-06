import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { HiMail } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import TextFieldWithLabel from "../Login-Signup/TextFieldWithLabel";
import Dropdown from "../common/Dropdown";

const ExchangeRequestModal = ({ closeModal, book }) => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const [description, setDescription] = useState("");
  const [userBooks, setUserBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookSelection = (selectedBook) => {
    setSelectedBook(selectedBook);
  };

  const handleExchangeRequest = () => {
    if (!selectedBook) {
      setError("Please select a book for exchange.");
      return;
    }

    if (description.trim() === "") {
      setError("Please enter a message for the exchange request.");
      return;
    }

    const requestedBookId = book._id;
    const proposedBookId = selectedBook.bookObject._id;

    axios
      .post(
        `http://localhost:3001/exchange/${requestedBookId}/exchange-request`,
        { proposalBook: proposedBookId, message: description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setMessage("Exchange request created successfully.");
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to create the exchange request.");
      });
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/books", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const { data } = response.data;
        const filteredBooks = data.filter(
          (book) => book.user.id === user?.data[0].id
        );
        setUserBooks(filteredBooks);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserBooks();
  }, [user]);

  return (
    <div className="bg-[#000000cb] text-black dark:text-white fixed top-0 left-0 z-50 w-full h-full flex flex-col items-center justify-center">
      <div className="modal relative w-full max-w-2xl overflow-auto">
        <div className="relative my-10 mx-5 bg-light-bg dark:bg-black-75 p-4 rounded-xl shadow dark:bg-gray-700">
          <button className="absolute top-3 right-4">
            <IoClose onClick={closeModal} className="w-7 h-7 text-black dark:text-white" />
          </button>

          {error && <span className="text-pale-red">{error}</span>}

          {message && <span className="text-pale-green">{message}</span>}

          <form
            className="my-6 grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4 md:gap-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleExchangeRequest();
            }}
          >
            <Dropdown
              dropdownList={userBooks.map((userBook) => ({
                title: userBook.title,
                bookObject: userBook,
              }))}
              dropdownLabel="Select book for exchange"
              dropdownPlaceholder="Select a book"
              selectedValue={selectedBook ? selectedBook.title : ""}
              onDropdownChange={handleBookSelection}
            />

            <TextFieldWithLabel
              label="Message"
              type="text"
              placeholder="Enter message for exchange request"
              icon={HiMail}
              className="md:col-span-2"
              value={description}
              onChange={handleDescriptionChange}
            />

            <div className="flex items-center justify-between md:col-span-2">
              <button
                type="button"
                className="w-fit mt-4 bg-black dark:bg-dark-slate text-white text-sm px-4 py-2 rounded-[2px] vsm:text-base md:mt-8"
                onClick={closeModal}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-fit mt-4 bg-black bg-purple-lighter text-black font-semibold text-sm px-4 py-2 rounded-[2px] vsm:text-base md:mt-8"
              >
                Request Exchange
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRequestModal;
