import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import AcceptedRequest from "./AcceptedRequest";

const AcceptedRequestsBody = () => {
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const { user } = useContext(UserContext);

  const fetchAcceptedRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/exchange/exchange-requests/accepted",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAcceptedRequests(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAcceptedRequests();
  }, []);

  return (
    <div className="mt-5 mb-16 flex flex-col items-stretch gap-4 md-2:mb-5">
      {acceptedRequests.length === 0 && (
        <div className="text-center">
          <p className="font-medium text-center md-2:text-lg">
            No Accepted Requests yet 🙁
          </p>
        </div>
      ) }
      
      {
        user === null &&
      (
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

      {acceptedRequests.map((request) => (
        <AcceptedRequest
          key={request._id}
          request={request}
          onUpdate={fetchAcceptedRequests}
        />
      ))}
    </div>
  );
};

export default AcceptedRequestsBody;
