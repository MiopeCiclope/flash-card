import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSelector } from 'react-redux';

export default function TabOneScreen() {
  const deck = useSelector((state: any) => state?.deckReducer.selectedDeck);
//{cards && cards.length > 0 &&
//          (<Text style={styles.title}>{cards[0].front.word}</Text>)
//        }
//        {!(cards && cards.length > 0) &&
//          (<Text style={styles.title}>No Flash Cards in this deck</Text>)
//        }
//
  return (
    <View style={styles.card}>
      {deck && <Text style={styles.title}>{deck.name}</Text>}
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
