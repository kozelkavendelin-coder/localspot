import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import MapScreen from './screens/MapScreen';
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import DiscussScreen from './screens/DiscussScreen';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
  const icons = { Mapa: '🗺️', Hledat: '🔍', Oblíbené: '❤️', Diskuze: '💬' };
  return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.45 }}>{icons[name]}</Text>;
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Mapa"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
          tabBarActiveTintColor: '#185FA5',
          tabBarInactiveTintColor: '#999',
          tabBarStyle: {
            height: 64,
            paddingBottom: 8,
            paddingTop: 4,
            borderTopColor: '#e0e0e0',
            backgroundColor: '#fff',
          },
          tabBarLabelStyle: { fontSize: 11 },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Oblíbené" component={FavoritesScreen} />
        <Tab.Screen name="Hledat" component={SearchScreen} />
        <Tab.Screen name="Mapa" component={MapScreen} />
        <Tab.Screen name="Diskuze" component={DiscussScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
