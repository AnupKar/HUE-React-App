import React, { useState, useCallback } from 'react';

export const HvcContext = React.createContext();

export const HvcProvider = ({ children }) => {
  const [navId, setNavId] = useState(1);
  const [region, selectedRegion] = useState(null);
  const [images, setImages] = useState([]);
  const [securities, setSecurity] = useState([]);
  const [instenceType, setInstance] = useState("");

  // infinite loop happens, if we don't use useCallback.
  // useCallback memorize the function to prevent re render.
  // it has no dependency, means it has no side effect. ( not change on state updates, only run when call by someone)
  const handleNavChange = useCallback((id) => {
    if (id < 1 || id > 5) return;
    setNavId(id);
  }, []);

  const handleSelectRegion = (region) => {
    selectedRegion(region);
  };

  // used to manage cart items for tab1.
  const handleSetImages = (image) => {
    const isFound = images.filter((each) => each.id === image.id);
    if (isFound.length > 0) {
      const newImages = [...images];
      const imgs = newImages.map((each) => (each.id === image.id ? { ...each, bit: image.bit } : each));
      setImages(imgs);
    } else setImages((prev) => [image, ...prev]);
  };

  const handleSetInstance = (data) => {
    setImages(prev => [...prev, ...data]);
  };

  const handleStorage = (storageType, capacity, id, isExt, encryption, backup, IOPS, remarks) => {
    const indx = images.findIndex((each) => each?.id === id && each?.type !== "image" && each?.type !== "instance");

    if (indx > -1) {
      const newData = [...images];
      newData.splice(indx, 1);
      setImages(newData);
    }

    let extraPrice = 0;
    if (storageType.name === 'SSD') {
      extraPrice = 40;
    }
    if (storageType.name === 'Magnetic Disks') {
      extraPrice = 20;
    }

    const item = {
      id: id,
      name: storageType.name,
      isExt: isExt,
      encryption, 
      backup,
      IOPS,
      remarks,
      bit: {
        name: `${capacity.value} GB`,
        price: !isExt
          ? Math.round(capacity.value * storageType.price, 2)
          : Math.round(capacity.value * storageType.price, 2) + extraPrice,
      },
    };
    setImages((prev) => [...prev, item]);
  };

  const addSecurity = useCallback((data) => {
    const isPresent = securities.filter((each) => each.id === data.id);
    if (isPresent.length) {
      const newSecurities = securities.map((each) => (each.id === data.id ? data : each));
      setSecurity([...newSecurities]);
    } else {
      setSecurity((prev) => [...prev, data]);
    }
  }, [securities]);
  //console.log("securities",securities);
  const resetSecurity = () => {
    setSecurity([]);
  }

  // useEffect(() => {
  //   console.log(securities);
  // }, [securities]);

  return (
    <HvcContext.Provider
      value={{
        navId,
        handleNavChange,
        region,
        handleSelectRegion,
        images,
        handleSetImages,
        handleSetInstance,
        handleStorage,
        addSecurity,
        resetSecurity,
        setInstance,
        instenceType,
        securities
      }}
    >
      {children}
    </HvcContext.Provider>
  );
};
