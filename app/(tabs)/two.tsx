import { StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { Card } from '@/models/card';

export default function TabTwoScreen() {
  const selectedCard = useSelector((state: any) => state?.deckReducer.selectedCard) as Card;
  if (!selectedCard) return null

  const { translation, sound, detail } = selectedCard.back

  return (
    <Link href="/(tabs)/one">
      <View style={styles.container}>
        <Text>{translation}</Text>
        <Text>{sound}</Text>
        <Text>{detail}</Text>
      </View>
    </Link>
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
