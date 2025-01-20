import { selectDeck } from '@/store/deckAction';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const AddDeck = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handlePress = useCallback(() => {
    dispatch(selectDeck());
    router.push('/deck-detail'); // Navigate to the desired route
  }, [dispatch, router]);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed, // Add feedback when pressed
      ]}
      onPress={handlePress}
      unstable_pressDelay={0} // Set to 0 to avoid any press delay
    >
      <Ionicons name="add" size={24} />
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

export default AddDeck;
