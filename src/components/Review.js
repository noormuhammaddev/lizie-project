import React from "react";

const Review = (props) => {


  return (
    <>
      <div className="flex gap-2">
        <span className="text-6xl font-bold font-playfair text-black2">“</span>

        <div>
          <p className="title text-black2 mb-2">{props.title}</p>

          <p className="text-black4 mb-4">{props.text}</p>

          <span className="subtitle text-black3">{props.name}</span>
        </div>
      </div>
    </>
  );
};

export default Review;