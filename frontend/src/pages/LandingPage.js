import React from "react";
import { Link } from "react-router-dom";
import BooksPile from "../assets/images/books-pile.png";
import PrimaryButton from "../components/common/PrimaryButton";

const LandingPage = () => {
  return (
    <div className="bg-container bg-[url('./assets/images/light-bg.jpg')] dark:bg-[url('./assets/images/dark-bg.jpg')] bg-light-bg dark:bg-dark-bg bg-no-repeat h-[100vh] flex justify-center sm:bg-contain sm:bg-right sm:h-auto sm:min-h-[100vh]">
      <div className="w-full flex flex-col items-center sm:flex-row-reverse">
        <div className="flex justify-end relative pt-4 -right-[35%] sm:w-[50%] sm:-right-[20%] md:w-[55%]">
          <div className="w-[70vw] h-[70vw] min-w-[350px] min-h-[350px] relative sm:w-[50vw] sm:h-[50vw] lg:w-[45vw] lg:h-[45vw]">
            <div className="relative w-[95%] h-[95%] border-2 dark:border-white rounded-full flex items-center justify-center">
              <div className="absolute pb-[100%] rotate-[-30deg]">
                <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
              </div>

              <div className="absolute pb-[100%] rotate-[-120deg] animate-dot2">
                <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
              </div>

              <div className="w-[70%] h-[70%] absolute border-2 dark:border-white rounded-full flex items-center justify-center">
                <div className="absolute pb-[100%] rotate-[10deg]">
                  <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                </div>

                <div className="absolute pb-[100%] rotate-[-150deg] animate-dot2">
                  <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
                </div>

                <div className="max-w-[60%] absolute top-[20%] left-[20%] sm:left-[10%]">
                  <img src={BooksPile} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute min-h-[40vh] flex flex-col gap-6 justify-center bottom-0 bg-white dark:bg-black z-20 text-black py-8 px-6 sm:static sm:w-[50%] sm:gap-8 sm:bg-[transparent] sm:dark:bg-[transparent] md:w-[45%] md:px-[5%]">
          <div className="flex flex-col gap-2">
            <h2 className="text-[36px] font-bold leading-[46px] dark:text-white">
              Read more, spend less with book swapping.
            </h2>

            <p className="dark:text-white">
              Get more out of your books with SwapReads' book exchange
              community.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Link to="/signin">
              <PrimaryButton btnLabel="Get Started" />
            </Link>

            <Link to="/signup">
              <button className="font-semibold py-2 px-5 sm:px-8 w-full dark:text-white">
                Create new account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
