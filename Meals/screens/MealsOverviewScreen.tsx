import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';
import {CATEGORIES, MEALS} from '../data/dummy-data';
import Meal from '../models/meal';
import MealItem from '../components/MealsList/MealItem';
import category from '../models/category';
import {useEffect, useLayoutEffect} from 'react';
import MealsList from '../components/MealsList/MealsList';

type OverviewScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MealsOverview'
>;
type OverviewRouteProp = RouteProp<RootStackParamList, 'MealsOverview'>;

type OverviewScreenProps = {
  navigation: OverviewScreenNavigationProp;
  route: OverviewRouteProp;
};

function MealsOverviewScreen({navigation, route}: OverviewScreenProps) {
  const catId = route.params.categoryId;

  useLayoutEffect(() => {
    const catTitle = CATEGORIES.find(category => category.id === catId)!.title;
    navigation.setOptions({
      title: catTitle,
    });
  }, [catId, navigation]);

  const displayedMeals = MEALS.filter(mealItem => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  return <MealsList items={displayedMeals} />;
}

export default MealsOverviewScreen;
