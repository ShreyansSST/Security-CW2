// HelpPage.js

import React from "react";
import {
  FaBook,
  FaCog,
  FaQuestionCircle,
  FaRegLightbulb,
  FaUser,
} from "react-icons/fa";
import { TbArrowForward } from "react-icons/tb";

const HelpPage = () => {
  return (
    <div className="bg-dark-bg text-white p-10">
      <h1 className="text-3xl text-purple-lighter text-center font-bold mb-8">
        SwapReads Help Center
      </h1>

      <div className="grid gap-8 xl:grid-cols-2 xl:gap-12">
        {/* Getting Started */}
        <div className="px-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl text-purple-lighter-hover font-bold mb-4 flex items-center">
            <FaUser className="mr-4 text-purple-lighter underline" />
            Getting Started
          </h2>
          <p className="text-purple-lighter-white-80">
            Welcome to SwapReads! Follow these steps to get started.
          </p>
          <ul className="list-none list-inside text-purple-lighter-white-80 mt-3 flex flex-col gap-1">
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              <p>
                {`If you already have an account, `}
                <a className="text-purple-lighter underline" href="/signin">
                  log in
                </a>
                {` to access your profile and continue your reading journey.`}
              </p>
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              <p>
                {`If you're new to SwapReads, `}
                <a className="text-purple-lighter underline" href="/signup">
                  sign up
                </a>
                {` to create an account and unlock all the exciting features.`}
              </p>
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              <p>
                {`Forgot your password? No worries! Easily `}
                <a
                  className="text-purple-lighter underline"
                  href="/forgotPassword"
                >
                  recover your password
                </a>
                {` through the email sent to your registered email address.`}
              </p>
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              <p>
                {`Prefer not to sign up right away? `}
                <a
                  className="text-purple-lighter underline"
                  href="/"
                >
                  Continue as Guest
                </a>
                {` and explore the platform.`}
              </p>
            </li>
          </ul>
        </div>

        {/* Adding a Book */}
        <div className="px-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl text-purple-lighter-hover font-bold mb-4 flex items-center">
            <FaBook className="mr-4 text-purple-lighter underline" />
            Adding a Book
          </h2>
          <p className="text-purple-lighter-white-80">
            To add a book for exchange, follow these steps:
          </p>
          <ul className="text-purple-lighter-white-80 mt-3 flex flex-col gap-1">
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Click on "Add Book" in the header.
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Fill in the necessary details for the book, including title,
              author, and description.
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Click "Add Book" to confirm and post your book for exchange.
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Visit your profile to view, edit, or delete your posted books.
            </li>
          </ul>
        </div>

        {/* Requesting an Exchange */}
        <div className="px-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl text-purple-lighter-hover font-bold mb-4 flex items-center">
            <FaRegLightbulb className="mr-4 text-purple-lighter underline" />
            Requesting an Exchange
          </h2>
          <p className="text-purple-lighter-white-80">
            To request an exchange, follow these steps:
          </p>
          <ul className="text-purple-lighter-white-80 mt-3 flex flex-col gap-1">
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Explore books on the homepage or search for a specific book.
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              In the book details page, click "Request Exchange."
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Select one of your books to propose for exchange and leave a
              message for the owner.
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              View all exchange requests in the sidebar under "Exchange
              Requests."
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Accept or decline exchange requests as needed.
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              For accepted requests, view the user's details for further
              communication.
            </li>
          </ul>
        </div>

        {/* Managing Your Profile */}
        <div className="px-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl text-purple-lighter-hover font-bold mb-4 flex items-center">
            <FaCog className="mr-4 text-purple-lighter underline" />
            Managing Your Profile
          </h2>
          <p className="text-purple-lighter-white-80">
            Learn how to manage your profile and books.
          </p>
          <ul className="text-purple-lighter-white-80 mt-3 flex flex-col gap-1">
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Click on your profile picture in the sidebar to access your
              profile.
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Edit your profile details, change your password, or log out.
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              View and manage your posted books, including editing or deleting
              them.
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Access your bookmarked books for future reference.
            </li>
          </ul>
        </div>

        {/* Troubleshooting */}
        <div className="px-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl text-purple-lighter-hover font-bold mb-4 flex items-center">
            <FaQuestionCircle className="mr-4 text-purple-lighter underline" />
            Troubleshooting
          </h2>
          <p className="text-purple-lighter-white-80">
            If you encounter any issues while using SwapReads, refer to our
            troubleshooting guide.
          </p>
          <ul className="text-purple-lighter-white-80 mt-3 flex flex-col gap-1">
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Check your internet connection.
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              Refresh the page and try again.
            </li>
            <li className="flex items-center">
              <span className="mr-2">
                <TbArrowForward className="text-pale-green text-2xl" />
              </span>
              <p>
                Contact our support team at{" "}
                <span className="text-purple-lighter">
                  support@swapreads.com
                </span>{" "}
                for personalized assistance.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
