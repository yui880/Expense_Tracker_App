import {StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {RouteProp} from '@react-navigation/native';

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
  return (
    <View style={styles.container}>
      <Text>Meals Overview Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
export default MealsOverviewScreen;
