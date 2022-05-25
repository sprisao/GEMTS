import React, {useState, useRef, useEffect} from 'react';

import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
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
const BannerContainer = styled.View`
  width: 100%;
  height: 100px;
  border-radius: 5px;
  overflow: hidden;
`;

const BannerScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
`;

const BulletContainer = styled.View`
  width: 100%;
  position: absolute;
  bottom: 5px;
  height: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Bullet = styled.View`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  margin: 5px;
  background-color: white;
  opacity: ${props => props.isActive};
`;

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
    <BannerContainer>
      <BannerScrollView
        horizontal
        pagingEnabled
        onMomentumScrollEnd={scrollEnded}
        showsHorizontalScrollIndicator={false}
        ref={scrollRef}>
        {ads.map(item => (
          <FastImage
            key={item.id}
            style={{width: DEVICE_WIDTH - 20, height: '100%'}}
            source={{
              uri: item.url,
            }}
          />
        ))}
      </BannerScrollView>
      <BulletContainer>
        {ads.map((item, i) => (
          <Bullet key={item.id} isActive={i === selectedIndex ? 1 : 0.5} />
        ))}
      </BulletContainer>
    </BannerContainer>
  );
};

export default Banner;
