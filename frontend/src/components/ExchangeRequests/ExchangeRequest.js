import axios from "axios";
import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { IoChatboxEllipsesOutline, IoTime } from "react-icons/io5";

const ExchangeRequest = ({ exchangeRequest, onUpdate }) => {
  const { requestedBook, formattedCreatedAt, proposalBookAuthor } =
    exchangeRequest;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleAccept = () => {
    setLoading(true);
    setError(null);

    axios
      .put(
        `http://localhost:3001/exchange/exchange-request/${exchangeRequest._id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // Handle successful acceptance of the exchange request
        setLoading(false);
        setSuccess(true);
        onUpdate(); // Call the onUpdate function to fetch updated data after accepting the request
      })
      .catch((error) => {
        // Handle error
        setLoading(false);
        setError("Failed to accept the exchange request.");
      });
  };

  const handleDecline = () => {
    setLoading(true);
    setError(null);

    axios
      .delete(
        `http://localhost:3001/exchange/exchange-request/${exchangeRequest._id}/decline`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        // Handle successful decline of the exchange request
        setLoading(false);
        setSuccess(true);
        onUpdate(); // Call the onUpdate function to fetch updated data after declining the request
      })
      .catch((error) => {
        // Handle error
        setLoading(false);
        setError("Failed to decline the exchange request.");
        console.log(error);
      });
  };

  return (
    <div className="w-full bg-dark-slate-85 dark:bg-black-75 px-4 py-4 rounded-xl flex flex-col gap-4 justify-between sm:flex-row">
      {/* {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}
      {success && (
        <p className="text-sm text-green-500">Request handled successfully.</p>
      )} */}
      <div className="flex items-center gap-2">
        <div className="w-[90px]">
          <img
            src={`http://localhost:3001/uploads/${exchangeRequest.proposalBookCover}`}
            alt=""
            className="w-full h-full rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="font-medium leading-none">
            {exchangeRequest.proposalBookTitle}
          </p>

          <div className="flex gap-1 items-center">
            <div>
              <IoTime className="w-4 h-4" />
            </div>

            <p className="text-sm">Requested {formattedCreatedAt}</p>
          </div>

          <div className="flex flex-col gap-1">
            {/* <img
              src="https://pbs.twimg.com/profile_images/1574649569899528193/c9nelX4M_400x400.jpg"
              alt=""
              className="w-[25px] h-[25px] rounded-full object-fill"
            /> */}

            <p className="text-[15px] font-medium">
              <span className="text-purple-lighter">By :</span> @
              {proposalBookAuthor}
            </p>
            <p className="text-[15px] font-medium">
              <span className="text-purple-lighter">For :</span>{" "}
              {requestedBook.title}
            </p>
            <p className="text-[15px] font-medium">
              <span className="text-purple-lighter">Message :</span>{" "}
              {exchangeRequest.message}
            </p>
          </div>
        </div>
      </div>

      <div className="flex self-center items-center gap-12 sm:gap-8">
        <button
          className="flex flex-col items-center gap-1 text-[#34A853] transition duration-200 hover:scale-[1.02]"
          onClick={handleAccept}
          // disabled={loading || success}
        >
          <BsCheck2Circle className="w-6 h-6 sm:w-8 sm:h-8" />
          <p className="text-sm font-medium">Accept</p>
        </button>

        <button
          className="flex flex-col items-center gap-1 text-[#EA4335] transition duration-200 hover:scale-[1.02]"
          onClick={handleDecline}
          // disabled={loading || success}
        >
          <AiOutlineCloseCircle className="w-6 h-6 sm:w-8 sm:h-8" />
          <p className="text-sm font-medium">Decline</p>
        </button>
      </div>
    </div>
  );
};

export default ExchangeRequest;
