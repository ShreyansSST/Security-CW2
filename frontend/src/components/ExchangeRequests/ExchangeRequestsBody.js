import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import ExchangeRequest from "./ExchangeRequest";

const ExchangeRequestsBody = () => {
  const [exchangeRequests, setExchangeRequests] = useState([]);
  const { user } = useContext(UserContext);

  const handleUpdate = () => {
    axios
      .get("http://localhost:3001/exchange/exchange-requests", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setExchangeRequests(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Fetch exchange requests from the API
    handleUpdate();
  }, []);

  // Filter exchange requests by status (show only "pending" requests)
  const pendingExchangeRequests = exchangeRequests.filter(
    (exchangeRequest) => exchangeRequest.status === "pending"
  );

  return (
    <div className="mt-5 mb-16 flex flex-col items-stretch gap-8 md-2:mb-5">
      {user ? (
        <p className="font-medium text-center md-2:text-lg">
          You have{" "}
          <span className="text-purple-lighter">
            {pendingExchangeRequests.length}
          </span>{" "}
          pending book exchange requests.
        </p>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <p className="font-medium text-center md-2:text-lg">
            You are not <span className="text-purple-lighter">logged in.</span>
          </p>

          <a
            href="/signin"
            className="text-white text-lg font-medium bg-purple-lighter hover:bg-purple-lighter-hover py-2 px-8 rounded-lg cursor-pointer transition duration-300"
          >
            Log In
          </a>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {pendingExchangeRequests.map((exchangeRequest) => (
          <ExchangeRequest
            key={exchangeRequest._id}
            exchangeRequest={exchangeRequest}
            onUpdate={handleUpdate} // Pass the handleUpdate function as a prop
          />
        ))}
      </div>
    </div>
  );
};

export default ExchangeRequestsBody;
