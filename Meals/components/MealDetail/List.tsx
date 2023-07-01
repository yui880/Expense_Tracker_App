import {StyleSheet, Text, View} from 'react-native';

function List({data}: {data: string[]}) {
  return (
    <>
      {data.map((dataPoint: string) => (
        <View key={dataPoint} style={styles.listItem}>
          <Text style={styles.itemText}>{dataPoint}</Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: 'white',
  },
  itemText: {
    color: 'black',
    textAlign: 'center',
  },
});

export default List;
