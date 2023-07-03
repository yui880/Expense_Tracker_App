import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Colors} from './constants/styles';
import {StatusBar} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignUpScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {RootState, store} from './store/store';
import IconButton from './components/ui/IconButton';
import {authenticate, logout} from './store/auth-redux';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

const authStack = createNativeStackNavigator<AuthStackParamList>();
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <authStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <authStack.Screen name="Login" component={LoginScreen} />
      <authStack.Screen name="Signup" component={SignupScreen} />
    </authStack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({tintColor}) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={() => {
                dispatch(logout());
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authState = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        dispatch(authenticate(storedToken));
      }
    }
    fetchToken();
  }, []);

  return (
    <NavigationContainer>
      {!authState.isAuthenticated && <AuthStack />}
      {authState.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

// function Root() {
//   const dispatch = useDispatch();
//
//   useEffect(() => {
//     async function fetchToken() {
//       const storedToken = await AsyncStorage.getItem('token');
//       if (storedToken) {
//         dispatch(authenticate(storedToken));
//       }
//     }
//     fetchToken();
//   }, []);
//
//   return <Navigation />;
// }

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
}
