import React, { useEffect, useState, useContext } from 'react';
import "firebase/firestore"
import { doc, setDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

function FavoriteBtn({ id, onlyIcon, initialFavoriteState  }) {
  const [favoriteState, setFavoriteState] = useState();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    setFavoriteState(initialFavoriteState);
  }, [initialFavoriteState]);

  const handleClick = () => {
    setFavoriteState(!favoriteState);
    toggleFavorite();
  };

  const toggleFavorite = async () => {
    const favoriteCollectionRef = doc(db, "favorites", currentUser.uid);

    if (!favoriteState) {
      await setDoc(favoriteCollectionRef, {
        favoritePropertyIds: arrayUnion(id)
      }, { merge: true });
    } else {
      await setDoc(favoriteCollectionRef, {
        favoritePropertyIds: arrayRemove(id)
      }, { merge: true });
    }
  };

  return (
    <button 
      className={`${ onlyIcon ? "flex " : "btn-slider h-12 w-12 " }text-black4 hover:text-focusHover text-2xl transition`} 
      onClick={handleClick}
    >
      <FontAwesomeIcon 
        icon={favoriteState ? solidHeart : regularHeart} 
        className={`${ favoriteState ? "text-focusHover" : "" }`} 
      />
    </button>
  );
}

export default FavoriteBtn;