import React, { useRef } from "react";
import { Link } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PostCard = (props) => {

  const postCardRef = useRef(null);

  return (
    <>
      <Link to={props.to} ref={postCardRef} className={`${ props.isHorizontal ? "grid grid-cols-2 gap-6" : "" }${ props.isFocus ? "flex flex-col" : "" }`}>
        <div className={`${ props.isHorizontal ? "h-56 lg:h-full" : "mb-4" } ${ props.isFocus ? "mb-4 h-56 lg:h-full " : "" }relative`}>
          <img src={props.img} alt="" className={`${ props.isHorizontal || props.isFocus ? "absolute h-full " : "h-56" }w-full object-cover rounded-lg`} />
        </div>
      
        <div className={`${ props.isHorizontal ? "flex flex-col justify-between" : "" }`}>
          <h4 className="roboto text-black2 mb-2">{props.title}</h4>
          <p className="text-black4 mb-4">{props.text}</p>

          <p className="link-primary font-medium">leer publicación</p>
        </div>
      </Link>
    </>
  );
};

export default PostCard;