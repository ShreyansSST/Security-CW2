import React from "react";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <img
          src="https://cdn.dribbble.com/users/761395/screenshots/6287961/error_401.jpg?resize=400x0"
          alt=""
        />
        <p className="text-black-75 font-medium mb-4">
          Oops! It seems like you need to log in to access this feature.
        </p>
        <a
          href="/signin"
          className="text-white text-lg font-medium bg-purple-lighter hover:bg-purple-lighter-hover py-2 px-8 rounded-lg cursor-pointer transition duration-300"
        >
          Log In
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;

