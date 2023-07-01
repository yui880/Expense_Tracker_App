import React from 'react';
import type {PropsWithChildren} from 'react';
import {Button, StatusBar, StyleSheet, Text, View} from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import FavoritesScreen from './screens/FavoritesScreen';
import IconButton from './components/IconButton';
import FavoritesContextProvider from './store/context/favorite-context';
import {Provider} from 'react-redux';
import {store} from './store/redux/store';

export type RootStackParamList = {
  MealsCategories: undefined;
  MealsOverview: {categoryId: string};
  MealDetail: {mealId: string};
};

export type RootDrawerParamList = {
  Categories: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();
function DrawerNavigator() {
  const temp = () => {};
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#ef0052'},
        headerTintColor: 'white',
        drawerContentStyle: {backgroundColor: '#ef0052'},
        drawerInactiveTintColor: '#ffa4a4',
        drawerActiveTintColor: 'white',
        // sceneContainerStyle: {backgroundColor: 'black'},
      }}>
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'All Categories',
          drawerIcon: ({color, size}) => (
            <IconButton icon="list" color={color} size={size} onPress={temp} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerIcon: ({color, size}) => (
            <IconButton icon="star" color={color} size={size} onPress={temp} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} />
      <FavoritesContextProvider>
        {/*<Provider store={store}>*/}
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: '#ef0052'},
              headerTintColor: 'white',
              // contentStyle: {backgroundColor: 'black'},
            }}>
            <Stack.Screen
              name="MealsCategories"
              component={DrawerNavigator}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
            />
            <Stack.Screen name="MealDetail" component={MealDetailScreen} />
          </Stack.Navigator>
        </NavigationContainer>
        {/*</Provider>*/}
      </FavoritesContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
