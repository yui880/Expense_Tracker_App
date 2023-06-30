import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';
import {CATEGORIES} from '../data/dummy-data';
import Category from '../models/category';
import CategoryGridTile from '../components/CategoryGridTile';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import category from '../models/category';

const numColumns = 2;

type CategoriesScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MealsCategories'
>;
type CategoriesScreenProps = {
  navigation: CategoriesScreenNavigationProp;
};

function CategoriesScreen({navigation}: CategoriesScreenProps) {
  const renderCategoryItem: ListRenderItem<Category> = ({item}) => {
    const pressHandler = () => {
      navigation.navigate('MealsOverview', {categoryId: item.id});
    };

    return (
      <CategoryGridTile
        title={item.title}
        color={item.color}
        onPress={pressHandler}
      />
    );
  };

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderCategoryItem}
      keyExtractor={item => item.id}
      numColumns={numColumns}
    />
  );
}

export default CategoriesScreen;
