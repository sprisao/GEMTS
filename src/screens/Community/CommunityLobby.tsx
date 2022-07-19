import {Text, View} from 'react-native';
import React from 'react';

type Props = {};

const eventData = [
  {
    id: 1,
    image: 'url',
    category: 'restaurants',
    place_id: 'reclkdjfjlflkk',
  },
  {
    id: 2,
    image: 'url',
    category: 'restaurants',
    place_id: 'reclkdjfjlflkk',
  },
  {
    id: 3,
    image: 'url',
    category: 'restaurants',
    place_id: 'reclkdjfjlflkk',
  },
];

const CommunityLobby = (props: Props) => {
  return (
    <View>
      <Text>원주사람이라면 놓칠 수 없는</Text>
      <Text>이벤트 & 할인소식</Text>
    </View>
  );
};

export default CommunityLobby;
