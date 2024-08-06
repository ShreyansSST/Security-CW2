import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import IndividualFavouriteBook from "./IndividualFavouriteBook";

const FavouritesBooks = ({ userInfo, fetchUserInfo }) => {
  const { user: currentUser } = useContext(UserContext);

  return (
    <div>
      {currentUser?.data[0].bookmarkedBooks.length === 0 ? (
        <p className="font-medium text-center md-2:text-lg">
          Your haven't bookmarked any books{" "}
          <span className="text-purple-lighter">yet</span>.
        </p>
      ) : (
        <div className="grid items-stretch grid-cols-2 gap-6 vsm:grid-cols-3 sm:grid-cols-4 md-2:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
          {currentUser?.data[0].bookmarkedBooks.map((bookId) => (
            <IndividualFavouriteBook
              key={bookId}
              bookId={bookId}
              userInfo={userInfo}
              fetchUserInfo={fetchUserInfo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavouritesBooks;
