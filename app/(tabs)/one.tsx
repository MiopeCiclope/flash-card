import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSelector } from 'react-redux';

export default function TabOneScreen() {
  const deck = useSelector((state: any) => state?.deckReducer.selectedDeck);

  return (
    <View style={styles.container}>
      {deck && <Text style={styles.title}>{deck.name}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
