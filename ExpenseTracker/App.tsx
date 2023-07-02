import {StatusBar, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GlobalStyles} from './constants/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import IconButton from './components/UI/IconButton';
import ExpensesContextProvider from './store/expenses-context';
import {Provider} from 'react-redux';
import {store} from './store/redux/store';

export type RootStackParamList = {
  ManageExpense: {expenseId: string};
  ExpensesOverview: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
        headerTintColor: 'white',
        tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate('ManageExpense');
            }}
          />
        ),
      })}>
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}) => (
            <Icon name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',
          tabBarLabel: 'All Expenses',
          tabBarIcon: ({color, size}) => (
            <Icon name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar barStyle={'light-content'} />
      {/*<ExpensesContextProvider>*/}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{presentation: 'modal'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/*</ExpensesContextProvider>*/}
    </>
  );
}
