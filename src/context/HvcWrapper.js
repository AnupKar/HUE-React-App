import React, { useState } from 'react';

export const HvcContext = React.createContext();

export const HvcProvider = ({ children }) => {
  const [navId, setNavId] = useState(1);
  const [region, selectedRegion] = useState(null);
  const [images, setImages] = useState([]);

  const handleNavChange = (id) => {
    if (id < 1 || id > 5) return;
    setNavId(id);
  };

  const handleSelectRegion = (region) => {
    selectedRegion(region);
  };

  const handleSetImages = (image) => {
    const isFound = images.filter((each) => each.id === image.id);
    if (isFound.length > 0) {
      const newImages = [...images];
      const imgs = newImages.map((each) => (each.id === image.id ? { ...each, bit: image.bit } : each));
      setImages(imgs);
    } else setImages((prev) => [image, ...prev]);
  };

  return (
    <HvcContext.Provider
      value={{
        navId,
        handleNavChange,
        region,
        handleSelectRegion,
        images,
        handleSetImages,
      }}
    >
      {children}
    </HvcContext.Provider>
  );
};
