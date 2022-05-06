import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, ScrollView, Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';

const DEVICE_WIDTH = Dimensions.get('window').width;

const ads = [
  {
    id: '1',
    url: 'https://dl.airtable.com/.attachmentThumbnails/c452444b20a3f604187df5d647573fe9/fb333f78',
  },
  {
    id: '2',
    url: 'https://dl.airtable.com/.attachmentThumbnails/29056fb1c875a7569e4b6c0d06d8fc6f/05b2b4b3',
  },
  {
    id: '3',
    url: 'https://dl.airtable.com/.attachmentThumbnails/85abf5b2d669bf1da20ab334cc7cf8e1/4c05cf78',
  },
];

const Banner = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  scrollRef = useRef();

  useEffect(() => {
    const counter = setTimeout(() => {
      setSelectedIndex(prev => (prev === ads.length - 1 ? 0 : prev + 1));
    }, 2000);
    scrollRef.current.scrollTo({
      animated: true,
      y: 0,
      x: (DEVICE_WIDTH - 20) * selectedIndex,
    });
    return () => clearTimeout(counter);
  }, [selectedIndex]);

  const scrollEnded = event => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;

    // get current position of the scrollView
    const contentOffset = event.nativeEvent.contentOffset.x;

    const selectedIndex = Math.floor(contentOffset / viewSize);
    setSelectedIndex(selectedIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        style={{width: '100%', height: '100%'}}
        onMomentumScrollEnd={scrollEnded}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}>
        {ads.map(item => (
          <FastImage
            style={styles.bannerImage}
            key={item.id}
            source={{
              uri: item.url,
            }}
          />
        ))}
      </ScrollView>
      <View style={styles.circleDiv}>
        {ads.map((item, i) => (
          <View
            key={item.id}
            style={[
              styles.whiteCircle,
              {opacity: i === selectedIndex ? 1 : 0.5},
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    borderRadius: 5,
    overflow: 'hidden',
  },
  bannerImage: {
    width: DEVICE_WIDTH - 20,
    height: '100%',
  },
  circleDiv: {
    width: '100%',
    position: 'absolute',
    bottom: 5,
    height: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteCircle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    margin: 5,
    backgroundColor: 'white',
  },
});
