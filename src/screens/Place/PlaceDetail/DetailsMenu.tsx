import React from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';
import {useGlobalContext} from '../../../contexts/placeContext.';

import FastImage from 'react-native-fast-image';

const DEVICE_WIDTH = Dimensions.get('window').width;

const DetailsMenu = ({storeId}) => {
  const {menu, menuLoading: isMenuLoading} = useGlobalContext();

  const thisMenu = menu.filter(item => item.store_id[0] === storeId);
  return (
    <View style={styles.menuContainer}>
      <View style={styles.menuWrapper}>
        <Text style={styles.menuHeader}>대표메뉴</Text>
        <View style={styles.menuItemWrapper}>
          {thisMenu.map(item => {
            return (
              <View style={styles.menuItem} key={item.id}>
                <View style={styles.imageContainer}>
                  <FastImage
                    source={{uri: item.menuImage[0].url}}
                    style={{width: '100%', height: '100%'}}
                  />
                </View>
                <View style={styles.articleContainer}>
                  <View style={styles.nameContaienr}>
                    <Text style={styles.menuName}>{item.menu}</Text>
                    {item.engMenu ? (
                      <Text style={styles.engMenu}>{item.engMenu}</Text>
                    ) : null}
                  </View>
                  <View style={styles.descContainer}>
                    <Text style={styles.menuDesc}>{item.menuDesc}</Text>
                  </View>
                  <View>
                    <Text style={styles.menuPrice}>{item.price}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default DetailsMenu;

const styles = StyleSheet.create({
  menuContainer: {},
  menuWrapper: {flex: 1, width: '100%', paddingHorizontal: 15},
  menuHeader: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Bold'},
      android: {fontFamily: 'AppleSDGothicNeoEB'},
    }),
    color: 'black',
    fontSize: 22,
    marginVertical: 7,
    letterSpacing: -0.5,
    marginLeft: 5,
  },
  menuItemWrapper: {
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 'auto',
    width: '100%',
    marginBottom: 25,
  },
  imageContainer: {
    width: DEVICE_WIDTH > 400 ? 140 : DEVICE_WIDTH > 375 ? 125 : 120,
    height: DEVICE_WIDTH > 400 ? 140 : DEVICE_WIDTH > 375 ? 125 : 120,
    borderRadius: 150,
    overflow: 'hidden',
  },
  articleContainer: {
    width: '60%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  menuName: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-Bold'},
      android: {fontFamily: 'AppleSDGothicNeoEB'},
    }),
    color: 'black',
    fontSize: 18,
  },
  engMenu: {
    ...Platform.select({
      ios: {color: '#888', fontFamily: 'AppleSDGothicNeo-Regular'},
      android: {fontFamily: 'AppleSDGothicNeoSB'},
    }),
  },
  menuDesc: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-UltraLight'},
      android: {fontFamily: 'AppleSDGothicNeoL'},
    }),
    color: 'black',
    fontSize: 13,
    letterSpacing: -0.35,
    marginVertical: 10,
  },
  menuPrice: {
    ...Platform.select({
      ios: {fontFamily: 'AppleSDGothicNeo-UltraLight'},
      android: {fontFamily: 'AppleSDGothicNeoL', color: 'black'},
    }),
  },
});
