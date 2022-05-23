import React from 'react';
import {useState, useContext, useEffect} from 'react';

const PlaceContext = React.createContext();

const PlaceProvider = ({children}) => {
  const data_cafes = 'Context에서 넘어왔지롱';
  const data_restaurants = '이건 Restaurants';
  const data_others = '이건 다른 카테고리 데이타';
  const isLoading = true;

  return (
    <PlaceContext.Provider
      value={{
        data_restaurants,
        data_cafes,
        data_others,
        isLoading,
      }}>
      {children}
    </PlaceContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(PlaceContext);
};

export {PlaceContext, PlaceProvider};
