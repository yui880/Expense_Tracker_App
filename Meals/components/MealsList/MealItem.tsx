import {
  Image,
  ListRenderItem,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Meal from '../../models/meal';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import MealDetails from '../MealDetails';

type mealItemParamList = {
  id: any;
  title: any;
  imageUrl: any;
  affordability: any;
  complexity: any;
  duration: any;
};
function MealItem({
  id,
  title,
  imageUrl,
  affordability,
  complexity,
  duration,
}: mealItemParamList) {
  type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<RootStackNavigationProp>();

  const selectMealItemHandler = () => {
    navigation.navigate('MealDetail', {mealId: id});
  };

  return (
    <View style={styles.mealItem}>
      <View style={styles.innerContainer}>
        <Pressable
          onPress={selectMealItemHandler}
          android_ripple={{color: '#ccc'}}
          style={({pressed}) => [pressed ? styles.buttonPressed : null]}>
          <View>
            <Image source={{uri: imageUrl}} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <MealDetails
            duration={duration}
            complexity={complexity}
            affordability={affordability}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    margin: 16,
    borderRadius: 8,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 12,
  },
  innerContainer: {
    // ios overflow hidden이 그림자와 다른 컨테이너에 설정되어 작동
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
    margin: 8,
  },
  buttonPressed: {
    opacity: 0.5,
  },
});

export default MealItem;
