import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useSelector } from 'react-redux';
import { Link } from 'expo-router';
import { Card } from '@/models/card';

export default function TabTwoScreen() {
  const selectedCard = useSelector((state: any) => state?.deckReducer.selectedCard) as Card;
  if (!selectedCard) return null;

  const { translation, sound, detail } = selectedCard.back;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Wrap only the clickable area (header and subheader) in a Link */}
        <Link href="/(tabs)/one">
          <View style={styles.clickableArea}>
            {/* Header (Translation) */}
            <Text style={styles.header}>{translation}</Text>

            {/* Subheader (Sound) */}
            <Text style={styles.subheader}>{sound}</Text>
          </View>
        </Link>

        {/* Main Text (Detail) - Wrapped in ScrollView (not part of the Link) */}
        <ScrollView style={styles.detailContainer}>
          {/* Ensure detail is always wrapped in a Text component */}
          <Text style={styles.detail}>{detail || ' '}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5', // Light gray background
  },
  card: {
    width: 300,
    height: 400,
    backgroundColor: '#fff8dc', // Light cream for the card
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    padding: 20,
  },
  clickableArea: {
    backgroundColor: '#fff8dc', // Match card background color
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left', // Align text to the left
  },
  subheader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'left', // Align text to the left
  },
  detailContainer: {
    flex: 1, // Take up remaining space
    width: '100%', // Ensure it spans the full width
    marginTop: 10, // Add some spacing between subheader and detail
  },
  detail: {
    fontSize: 16,
    color: '#555',
    textAlign: 'left', // Align text to the left
    lineHeight: 22,
  },
});
