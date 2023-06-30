import React from 'react';
import type {PropsWithChildren} from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import CategoriesScreen from './screens/CategoriesScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MealsOverviewScreen from './screens/MealsOverviewScreen';

export type RootStackParamList = {
  MealsCategories: undefined;
  MealsOverview: {categoryId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();
function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MealsCategories" component={CategoriesScreen} />
          <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({});

export default App;
