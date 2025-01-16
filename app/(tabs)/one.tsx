import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSelector } from 'react-redux';

export default function TabOneScreen() {
  const deck = useSelector((state: any) => state?.deckReducer.selectedDeck);
  const hasCard = deck && deck.cards && deck.cards.length > 0

  const randomIndex = Math.floor(Math.random() * deck.cards.length);
  const displayedCard = hasCard ? deck.cards[randomIndex] : null

  return (
    <View style={styles.card}>
      {hasCard && (<Text style={styles.title}>{displayedCard?.front.word}</Text>)}
      {!hasCard && (<Text style={styles.title}>No Flash Cards in this deck</Text>)}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    padding: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
