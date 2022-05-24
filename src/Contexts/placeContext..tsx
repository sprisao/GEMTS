import React from 'react';
import {useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';

const PlaceContext = React.createContext();

const PlaceProvider = ({children}) => {
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [stores, setStores] = useState([]);

  const storesRef = category =>
    firestore()
      .collection('stores_new')
      .orderBy('preRating', 'desc')
      .where('firstCategoryId', 'array-contains', category);

  const getStores = async thisFirstCategory => {
    setIsLoading(true);

    const snapshot = await storesRef(thisFirstCategory).limit(50).get();

    if (!snapshot.empty) {
      let _stores = [];
      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        _stores.push(snapshot.docs[i].data());
      }

      setStores(_stores);
    } else {
      setLastDoc(null);
    }

    setIsLoading(false);
  };

  const getMore = async thisFirstCategory => {
    if (lastDoc) {
      setIsMoreLoading(true);
      setTimeout(async () => {
        let snapshot = await storesRef(thisFirstCategory)
          .startAfter(lastDoc)
          .limit(100)
          .get();

        if (!snapshot.empty) {
          let newRestaurants = stores;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            newRestaurants.push(snapshot.docs[i].data());
          }

          setStores(newRestaurants);
          if (snapshot.docs.length < 3) {
            setLastDoc(null);
          }
        } else {
          setLastDoc(null);
        }

        setIsMoreLoading(false);
      }, 200);
    }
    setOnEndReachedCalledDuringMomentum(true);
  };

  return (
    <PlaceContext.Provider
      value={{
        stores,
        isMoreLoading,
        isLoading,
        getStores,
        getMore,
        onEndReachedCalledDuringMomentum,
        setOnEndReachedCalledDuringMomentum,
      }}>
      {children}
    </PlaceContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(PlaceContext);
};

export {PlaceContext, PlaceProvider};
