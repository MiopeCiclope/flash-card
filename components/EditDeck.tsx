import Ionicons from '@expo/vector-icons/build/Ionicons';
import React, { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const EditDeck = () => {
  const router = useRouter();

  const handlePress = useCallback(() => {
    router.push('/deck-detail'); // Navigate to the desired route
  }, [router]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed, // Add feedback when pressed
      ]}
      onPress={handlePress}
      unstable_pressDelay={0} // Set to 0 to avoid any press delay
    >
      <Ionicons name="pencil" size={24} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 10,
    padding: 10, // Increases the touchable area
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6, // Visual feedback when pressed
  },
});

export default EditDeck;
