import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AcceptedRequestsBody from "../components/AcceptedRequests/AcceptedRequestsBody";
import Dashboard from "../components/Admin/Dashboard";
import ExchangeRequestsBody from "../components/ExchangeRequests/ExchangeRequestsBody";
import BookDetails from "../components/Homepage/BookDetails";
import HomepageBody from "../components/Homepage/HomepageBody";
import ProfileBody from "../components/Profile/ProfileBody";
import SearchBody from "../components/SearchPage/SearchBody";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import BookModal from "../components/modal/AddBookModal";
import { UserContext } from "../context/UserContext";

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user?.data[0]?.userType === "admin") {
      setActiveTab("dashboard");
    }
  }, [user]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setSelectedBook(null);
    localStorage.setItem("activeTab", tabName);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setActiveTab("bookDetails");
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchUserInfo = async (userId) => {
    try {
      const response = await axios.get(
        `https://localhost:3001/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); // Replace with your API endpoint for fetching user information
      if (response.status === 200) {
        const userData = response.data;
        setUserInfo(userData);
      } else {
        console.error("Failed to fetch user information");
      }
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const tabConfig = {
    home: {
      header: "Homepage",
      pageInfo: "Read, Swap, Repeat",
      body: (
        <HomepageBody
          handleBookClick={handleBookClick}
          userInfo={userInfo}
          fetchUserInfo={fetchUserInfo}
        />
      ),
    },
    search: {
      header: "Search Books",
      pageInfo: "Search for books",
      body: (
        <SearchBody
          handleBookClick={handleBookClick}
          userInfo={userInfo}
          fetchUserInfo={fetchUserInfo}
        />
      ),
    },
    exchange: {
      header: "Exchange Requests",
      pageInfo: "Manage exchange requests",
      body: <ExchangeRequestsBody />,
    },
    acceptedRequests: {
      header: "Accepted Requests",
      pageInfo: "View accepted requests",
      body: <AcceptedRequestsBody />,
    },
    profile: {
      header: "Profile",
      pageInfo: "View your profile",
      body: <ProfileBody userInfo={userInfo} fetchUserInfo={fetchUserInfo} />,
    },
    bookDetails: {
      header: "Book Details",
      pageInfo: "View book details",
      body: (
        <BookDetails
          book={selectedBook}
          userInfo={userInfo}
          fetchUserInfo={fetchUserInfo}
        />
      ),
    },
    dashboard: {
      header: "Admin Dashboard",
      body: <Dashboard />,
    },
  };

  const { header, pageInfo, body } = tabConfig[activeTab];

  return (
    <div className="flex w-full min-h-[100vh] bg-light-bg dark:bg-dark-bg">
      <>
        <Sidebar activeTab={activeTab} handleTabClick={handleTabClick} />

        {/* <div className="flex flex-col justify-between text-black dark:text-white p-6 w-full md-2:ml-[280px] md-2:flex-1 md-2:relative md-2:px-6 md-2:py-0 lg:px-10">
          <div>
            <Header
              currentPage={header}
              pageInfo={pageInfo}
              handleTabClick={handleTabClick}
              openModal={openModal}
            />

            {body}
          </div>
        </div> */}
      </>
      )
      {isModalOpen && (
        <BookModal closeModal={closeModal} openModal={openModal} />
      )}
    </div>
  );
};

export default MainPage;
