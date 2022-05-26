import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import {useGlobalContext} from '../../../contexts/placeContext.';
import GridCard from './GridCard';

const GridContainer = props => {
  const {
    getStores,
    isLoading,
    getMore,
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
    isMoreLoading,
  } = useGlobalContext();
  let spotFilter = '';
  if (props.isSpot) {
    spotFilter = 'SpotDetails';
  } else {
    spotFilter = 'Details';
  }

  const renderStoreGrid = data => {
    return (
      <GridCard
        name={data.item.name}
        location={data.item.miniAddress}
        rating={data.item.preRating}
        desc={data.item.shortDescription}
        image={data.item.images[0].url}
        openHour={data.item.openHour}
        closeHour={data.item.closeHour}
        onSecondSelect={() => {
          props.navigation.navigate('StoreDetail', {
            data: data,
          });
        }}
      />
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedValue = useMemo(() => renderStoreGrid, [props.data]);

  const onRefresh = () => {
    setTimeout(() => {
      getStores(props.firstCategory);
    }, 1000);
  };

  const renderFooter = () => {
    if (!isMoreLoading) {
      return true;
    }

    return <ActivityIndicator size="large" style={{marginBottom: 10}} />;
  };

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
        ListFooterComponent={() => renderFooter()}
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

export default GridContainer;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 8,
    paddingTop: 10,
  },
});
