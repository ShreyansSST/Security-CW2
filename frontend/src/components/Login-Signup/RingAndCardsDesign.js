import React from "react";
import BooksPile from "../../assets/images/books-pile.png";

const RingAndCardsDesign = () => {
  return (
    <div className="hidden sm:flex justify-end relative pt-4 -right-[35%] sm:w-[50%] sm:-right-[20%] md:w-[55%]">
      <div className="w-[70vw] h-[70vw] min-w-[350px] min-h-[350px] relative sm:w-[50vw] sm:h-[50vw] lg:w-[45vw] lg:h-[45vw]">
        <div className="relative w-[95%] h-[95%] border-2 dark:border-white rounded-full flex items-center justify-center">
          <div className="absolute pb-[100%] rotate-[-30deg]">
            <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
          </div>

          <div className="absolute pb-[100%] rotate-[-120deg] animate-dot2">
            <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
          </div>

          <div className="w-[70%] h-[70%] absolute border-2 rounded-full flex items-center justify-center dark:border-white">
            <div className="absolute pb-[100%] rotate-[10deg]">
              <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
            </div>

            <div className="absolute pb-[100%] rotate-[-150deg] animate-dot2">
              <div className="w-4 h-4 bg-black dark:bg-white rounded-full"></div>
            </div>

            <div className="max-w-[60%] absolute top-[20%] left-[8%]">
              <img src={BooksPile} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RingAndCardsDesign;
