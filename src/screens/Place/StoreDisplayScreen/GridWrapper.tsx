import React, {useMemo} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
import {useGlobalContext} from '../../../Contexts/placeContext.';
import {PlaceContext} from '../../../Contexts/placeContext.';
import GridTile from './GridTile';

const GridWrapper = props => {
  const {
    isLoading,
    getMore,
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
    isMoreLoading,
  } = useGlobalContext();
  let spotFilter = '';
  if (props.isSpot) {
    spotFilter = 'SpotDetails';
  } else spotFilter = 'Details';

  const renderStoreGrid = data => {
    return (
      <GridTile
        name={data.item.name}
        location={data.item.miniAddress}
        rating={data.item.preRating}
        desc={data.item.shortDescription}
        image={data.item.images[0].url}
        openHour={data.item.openHour}
        closeHour={data.item.closeHour}
        onSecondSelect={() => {
          props.navigation.navigate({
            name: 'Details',
            params: {
              storeName: data.item.name,
              storeDetails: data.item,
            },
          });
        }}
      />
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedValue = useMemo(() => renderStoreGrid, [props.data]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={props.data}
        keyExtractor={item => item.name}
        renderItem={memoizedValue}
        style={{flex: 1}}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        numColumns={2}
        windowSize={2}
        bounces={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => onRefresh()}
          />
        }
        onEndReachedThreshold={0.7}
        onMomentumScrollBegin={() => {
          setOnEndReachedCalledDuringMomentum(false);
        }}
        onEndReached={() => {
          if (!onEndReachedCalledDuringMomentum && !isMoreLoading) {
            getMore(props.firstCategory);
          }
        }}
        disableVirtualization={false} //비정상적인 스크롤 동작을 방지하려고
      />
    </View>
  );
};

export default GridWrapper;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 10,
  },
});
