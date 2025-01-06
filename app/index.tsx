import React from 'react';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';

export default function ListScreen() {
  return (
    <View>
      <Text style={{ fontSize: 20, textAlign: 'center' }}>List</Text>
      <Link href="/(tabs)/one">
        navigate to tabs
      </Link>
    </View>
  );
}
