import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStackNavigation from './navigation/HomeStackNavigation';
import ProfileStackNavigation from './navigation/ProfileStackNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <StackNavigation /> */}
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'Chats') {
              iconName = focused
                ? 'ios-chatbubble-ellipses-sharp'
                : 'ios-chatbubble-ellipses-outline';
            } else if (route.name === 'Community') {
              iconName = focused ? 'flash' : 'flash-outline';
            } else if (route.name === 'Profile') {
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
        <Tab.Screen name="Home" component={HomeStackNavigation} />
        <Tab.Screen name="Community" component={ProfileStackNavigation} />
        <Tab.Screen
          name="Chats"
          component={ProfileStackNavigation}
          options={{tabBarBadge: 3}}
        />
        <Tab.Screen name="Profile" component={ProfileStackNavigation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default App;
