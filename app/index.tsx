import React from 'react';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import Deck from '@/components/Deck';

export default function ListScreen() {
  return (
    <View>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>List</Text>
      <Link href="/(tabs)/one">
        navigate to tabs
      </Link>

      <Deck iconName='home' title='Home' />
      <Deck iconName='search' title='Search' />
      <Deck iconName='settings' title='Settings' />
    </View>
  );
}
