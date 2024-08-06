import React, { useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import Button from "./Button";
import ChangePassword from "./ChangePassword";
import EditProfile from "./EditProfile";
import FavouritesBooks from "./FavouritesBooks";
import UserInfo from "./UserInfo";
import YourBooks from "./YourBooks";

const ProfileBody = ({ userInfo, fetchUserInfo }) => {
  const [activeButton, setActiveButton] = useState("Your Books");
  const { user } = useContext(UserContext);

  const handleButtonClick = (btnName) => {
    setActiveButton(btnName);
  };

  const formComponent =
    activeButton === "Your Books" ? (
      <YourBooks />
    ) : activeButton === "Bookmarks" ? (
      <FavouritesBooks userInfo={userInfo} fetchUserInfo={fetchUserInfo} />
    ) : activeButton === "Edit Profile" ? (
      <EditProfile />
    ) : activeButton === "Change Password" ? (
      <ChangePassword />
    ) : null;

  return (
    <div className="mt-5 mb-16 flex flex-col gap-8 xl:flex-row">
      <UserInfo />

      <div className="w-full flex flex-col gap-6 xl:w-[70%]">
        <div className="flex flex-wrap gap-2 vsm:gap-4">
          <Button
            btnName="Your Books"
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
          />
          {user?.data[0]?.userType !== "admin" && (
            <Button
              btnName="Bookmarks"
              activeButton={activeButton}
              handleButtonClick={handleButtonClick}
            />
          )}
          <Button
            btnName="Edit Profile"
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
          />
          <Button
            btnName="Change Password"
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
          />
        </div>

        {formComponent}
      </div>

    </div>
  );
};

export default ProfileBody;
