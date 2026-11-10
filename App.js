import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import FavouritesScreen from './screens/FavouritesScreen';
// import FavouriteContextProvider from './store/context/favourites-context';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerNavigator() {

  return (
    <Drawer.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#351401',
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      sceneContainerStyle: {
        backgroundColor: '#3f2f25',
      },
      drawerStyle: {
        backgroundColor: '#351401',
      },
      drawerContentStyle: {},
      drawerActiveTintColor: '#351401',
      drawerInactiveTintColor: 'white',
      drawerActiveBackgroundColor: '#e4baa1',
    }}>
      <Drawer.Screen name='Categories' component={CategoriesScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({ color, size }) => <Ionicons name='list' color={color} size={size} />
        }}
      />
      <Drawer.Screen name="Favourite" component={FavouritesScreen} options={{
        title: 'Favourites',
        drawerIcon: ({ color, size }) => <Ionicons name='star' color={color} size={size} />
      }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      {/* <FavouriteContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#351401' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: '#3f2f25' },
          }}>
            <Stack.Screen name="Drawer" component={DrawerNavigator} options={{
              headerShown: false
            }} />
            <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
            <Stack.Screen name='MealDetail' component={MealDetailScreen} options={{
              title: 'About The Meal'
            }} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </FavouriteContextProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});
