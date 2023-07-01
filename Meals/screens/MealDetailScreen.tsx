import {Button, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {Link, RouteProp, useRoute} from '@react-navigation/native';
import {MEALS} from '../data/dummy-data';
import MealDetails from '../components/MealDetails';
import Subtitle from '../components/MealDetail/Subtitle';
import List from '../components/MealDetail/List';
import {useContext, useLayoutEffect} from 'react';
import IconButton from '../components/IconButton';
import {FavoritesContext} from '../store/context/favorite-context';
import meal from '../models/meal';
import {useSelector} from 'react-redux';

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MealDetail'
>;
type DetailRouteProp = RouteProp<RootStackParamList, 'MealDetail'>;

type DetailScreenProps = {
  navigation: DetailScreenNavigationProp;
  route: DetailRouteProp;
};
function MealDetailScreen({navigation, route}: DetailScreenProps) {
  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find(meal => meal.id === mealId)!;

  const favoriteMealsCtx = useContext(FavoritesContext);
  const mealIsFavorite = favoriteMealsCtx.ids.includes(mealId);
  const changeFavoriteStatusHandler = () => {
    if (mealIsFavorite) {
      favoriteMealsCtx.removeFavorite(mealId);
    } else {
      favoriteMealsCtx.addFavorite(mealId);
    }
  };

  // const favoriteMealIds = useSelector(state => state.favoriteMeals.ids);
  // const mealIsFavorite = favoriteMealIds.ids.includes(mealId);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            color="white"
            size={24}
            icon={mealIsFavorite ? 'star' : 'star-outline'}
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image source={{uri: selectedMeal.imageUrl}} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <View>
        <MealDetails
          duration={selectedMeal.duration}
          complexity={selectedMeal.complexity}
          affordability={selectedMeal.complexity}
          textStyle={styles.detailText}
        />
      </View>
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredient</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    maxWidth: '80%',
  },
});

export default MealDetailScreen;
