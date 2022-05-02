import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PlaceTabStack from './navigation/PlaceTabStack';
import CommunityTabStack from './navigation/CommunityTabStack';
import ChatTabStack from './navigation/ChatTabStack';
import AccountTabStack from './navigation/AccountTabStack';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <StackNavigation /> */}
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'PlaceTab') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'ChatTab') {
              iconName = focused
                ? 'ios-chatbubble-ellipses-sharp'
                : 'ios-chatbubble-ellipses-outline';
            } else if (route.name === 'CommunityTab') {
              iconName = focused ? 'flash' : 'flash-outline';
            } else if (route.name === 'AccountTab') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="PlaceTab" component={PlaceTabStack} />
        <Tab.Screen name="CommunityTab" component={CommunityTabStack} />
        <Tab.Screen
          name="ChatTab"
          component={ChatTabStack}
          options={{tabBarBadge: 3}}
        />
        <Tab.Screen name="AccountTab" component={AccountTabStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
