import React, { createContext, useContext, useEffect, useState } from "react";
import "firebase/firestore";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const PropertyContext = createContext();
const PropertyProvider = ({ children }) => {
  const [favProps, setFavProps] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/api/property`)
      .then((response) => response.json())
      .then((datatemp) => {
        setData(datatemp);
      })
      .catch((error) => console.error(error));
    if (
      currentUser === "undefined" ||
      currentUser === null ||
      Object.keys(currentUser).length === 0
    ) {
    } else {
      async function getLiked() {
        const likeRef = doc(db, "favorites", currentUser.uid);
        const docSnap = await getDoc(likeRef);
        if (docSnap.exists()) {
          const favoriteData = docSnap.data();
          const favoritePropertyIds = favoriteData.favoritePropertyIds || [];
          setFavProps(favoritePropertyIds);
        } else {
          console.log("Favorites document does not exist");
        }
      }
      getLiked();
    }
  }, [currentUser]);
  const imagesObject = data.reduce((obj, item, index) => {
    const imagesArray = item.images.map(
      (image) => `${process.env.REACT_APP_BASE_URL}${image.imageUrl}`
    );
    obj[index] = imagesArray;
    return obj;
  }, {});

  const propertiesArray = data.map((item, index) => ({
    id: `${index}`,
    to: "/inner-page",
    imgs: imagesObject[index],
    type: item.property,
    squareMeter: item.area,
    room: item.rooms,
    district: item.distrito,
    rentPrice: item.rent,
    dollarRentPrice: item.rent / 20,
    condoPrice: "500",
    favoriteState: false,
    title: item.title,
    bathroom: item.bathrooms,
    parking: item.parking,
    pets: true,
    garden: true,
    patio: true,
    pool: true,
    commonAreas: true,
    description: item.description,
    address: item.address,
  }));
  if (favProps !== null) {
    propertiesArray.forEach((card) => {
      for (let i = 0; i < favProps.length; i++) {
        if (favProps[i] === card.id) {
          card.favoriteState = true;
          break; // Terminate the loop if the condition is met
        }
      }
    });
  }
  return (
    <PropertyContext.Provider value={{ propertiesArray }}>
      {children}
    </PropertyContext.Provider>
  );
};
export { PropertyContext, PropertyProvider };
