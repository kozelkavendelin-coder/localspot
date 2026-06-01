import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import MapScreen from './screens/MapScreen';
import SearchScreen from './screens/SearchScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import DiscussScreen from './screens/DiscussScreen';
import DetailScreen from './screens/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabIcon = ({ name, focused }) => {
  const icons = { Mapa: '🗺️', Hledat: '🔍', Oblíbené: '❤️', Diskuze: '💬' };
  return <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.4 }}>{icons[name]}</Text>;
};

// Stack pro každou záložku — umožní navigaci na Detail z libovolné záložky
function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapMain" component={MapScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchMain" component={SearchScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function FavStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavMain" component={FavoritesScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

function DiscussStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DiscussMain" component={DiscussScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Mapa"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => <TabIcon name={route.name} focused={focused} />,
          tabBarActiveTintColor: '#185FA5',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: {
            height: 64,
            paddingBottom: 10,
            paddingTop: 4,
            borderTopColor: '#e8e8e8',
            backgroundColor: '#fff',
          },
          tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Oblíbené" component={FavStack} />
        <Tab.Screen name="Hledat" component={SearchStack} />
        <Tab.Screen name="Mapa" component={MapStack} />
        <Tab.Screen name="Diskuze" component={DiscussStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
