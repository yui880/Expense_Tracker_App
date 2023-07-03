import {StyleSheet, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMessage] = useState('');
  const token = useSelector((state: RootState) => state.auth).token;

  useEffect(() => {
    axios
      .get(
        'https://expensetracker-d9c40-default-rtdb.firebaseio.com/message.json?auth=' +
          token,
      )
      .then(response => {
        setFetchedMessage(response.data);
      });
  }, [token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
