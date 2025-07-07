import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

// Import screens
import DashboardScreen from '../screens/DashboardScreen';
import WorldMapScreen from '../screens/WorldMapScreen';
import ChatScreen from '../screens/ChatScreen';
import ClaimsScreen from '../screens/ClaimsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          if (route.name === 'Dashboard') {
            iconName = focused ? '📊' : '📊';
          } else if (route.name === 'World Map') {
            iconName = focused ? '🗺️' : '🗺️';
          } else if (route.name === 'Chat') {
            iconName = focused ? '💬' : '💬';
          } else if (route.name === 'Claims') {
            iconName = focused ? '🏰' : '🏰';
          } else if (route.name === 'Profile') {
            iconName = focused ? '👤' : '👤';
          } else {
            iconName = '❓';
          }

          return <Text style={{fontSize: size, color}}>{iconName}</Text>;
        },
        tabBarActiveTintColor: '#0ea5e9',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: '#0ea5e9',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="World Map"
        component={WorldMapScreen}
        options={{
          title: 'World Map',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          title: 'Chat',
        }}
      />
      <Tab.Screen
        name="Claims"
        component={ClaimsScreen}
        options={{
          title: 'Claims',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator; 