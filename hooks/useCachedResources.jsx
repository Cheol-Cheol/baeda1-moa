import React, { useEffect, useState } from "react";
import * as Font from "expo-font";

const useCachedResources = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        await Font.loadAsync({
          "black-han-sans-regular": require("../assets/fonts/BlackHanSans-Regular.ttf"),
        });
      } catch (e) {
        console.log("ResourceErr: ", e.message);
      } finally {
        setIsLoadingComplete(true);
      }
    };

    loadResourcesAndDataAsync();
  }, [isLoadingComplete]);

  return isLoadingComplete;
};

export default useCachedResources;
