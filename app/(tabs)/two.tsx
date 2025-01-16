import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSelector } from 'react-redux';

export default function TabTwoScreen() {
  const deck = useSelector((state: any) => state?.deckReducer.selectedDeck);
  console.log(deck);
  const { translation, sound, detail } = deck.cards[0].back

  return (
    <View style={styles.container}>
      <Text>{translation}</Text>
      <Text>{sound}</Text>
      <Text>{detail}</Text>
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
