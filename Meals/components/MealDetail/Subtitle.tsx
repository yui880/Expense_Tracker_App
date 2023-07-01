import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

function Subtitle({children}: {children: React.ReactNode}) {
  return (
    <View style={styles.subTitleContainer}>
      <Text style={styles.subTitle}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitleContainer: {
    padding: 6,
    marginHorizontal: 12,
    marginVertical: 4,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
});
export default Subtitle;
