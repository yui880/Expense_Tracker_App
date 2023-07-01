import {StyleSheet, Text, View} from 'react-native';
import MealsList from '../components/MealsList/MealsList';
import {useContext} from 'react';
import {FavoritesContext} from '../store/context/favorite-context';
import {MEALS} from '../data/dummy-data';

function FavoritesScreen() {
  const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMeals = MEALS.filter(meal =>
    favoriteMealsCtx.ids.includes(meal.id),
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.routeContainer}>
        <Text style={styles.text}>You have no favorite meal yet.</Text>
      </View>
    );
  } else {
    return <MealsList items={favoriteMeals} />;
  }
}

const styles = StyleSheet.create({
  routeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default FavoritesScreen;
