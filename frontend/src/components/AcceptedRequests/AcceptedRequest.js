import axios from "axios";
import React from "react";
import {
  IoCall,
  IoCloseCircle,
  IoMailOpen,
  IoMailOutline,
} from "react-icons/io5";

const AcceptedRequest = ({ request, onUpdate }) => {
  const handleRemove = () => {
    axios
      .delete(
        `http://localhost:3001/exchange/exchange-request/${request._id}/decline`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        onUpdate(); // Call the onUpdate function to fetch updated data after declining the request
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="relative w-full bg-dark-slate-85 dark:bg-black-75 p-2 rounded-xl flex items-center justify-between gap-4 vsm:p-4">
      <div
        className="flex items-center gap-3"
        // onClick={window.open(
        //   "mailto:nischal@gmail.com?subject=Subject&body=Body%20goes%20here"
        // )}
      >
        <div>
          <img
            src={`http://localhost:3001/uploads/${request.proposalBookAuthor.image}`}
            alt=""
            className="max-w-[70px] max-h-[70px] min-w-[45px] min-h-[45px] rounded-full object-fill vsm:w-[55px] vsm:h-[55px]"
          />
        </div>

        <div className="flex flex-col">
          <div>
            <p className="text-[17px] font-medium">
              Your request for{" "}
              <span className="text-purple-lighter font-semibold">
                {request.requestedBook.title}
              </span>{" "}
              has been accepted by{" "}
              <span className="text-purple-lighter font-semibold">
                {request.proposalBookAuthor.fullname}
              </span>{" "}
              🎉
            </p>

            <p>
              Contact the book owner to discuss further details about the
              exchange.
            </p>
          </div>

          <div className="mt-2">
            <p className="text-purple-lighter font-medium">Contact Details: </p>
            <p className="text-[15px] font-medium flex gap-1 items-center">
              <IoMailOutline className="w-5 h-5 text-pale-green" />
              {request.proposalBookAuthor.email}
            </p>
            {request.proposalBookAuthor.phoneNumber && (
              <p className="text-[15px] font-medium flex gap-1 items-center">
                <IoCall className="w-5 h-5 text-pale-green" />
                {request.proposalBookAuthor.phoneNumber}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-8">
        <IoMailOpen
          className="cursor-pointer w-8 h-8 text-pale-green transition-all duration-300 hover:scale-110"
          onClick={() =>
            window.open(`mailto:${request.proposalBookAuthor.email}`)
          }
        />

        <IoCloseCircle
          className="cursor-pointer w-8 h-8 text-pale-red transition-all duration-300 hover:scale-110"
          onClick={handleRemove}
        />
      </div>
    </div>
  );
};

export default AcceptedRequest;
