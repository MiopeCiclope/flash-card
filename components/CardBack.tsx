import React from 'react'
import { StyleSheet, ScrollView } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Card } from '@/models/card';

export const CardBack = (props: { card?: Card | null }) => {
  if (!props.card)
    return (<Text>no card</Text>)

  const { translation, sound, detail } = props.card?.back

  return (
    <>
      <View style={styles.clickableArea}>
        <Text style={styles.header}>{translation}</Text>
        <Text style={styles.subheader}>{sound}</Text>
      </View>
      <ScrollView style={styles.detailContainer}>
        <Text style={styles.detail}>{detail || ' '}</Text>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  clickableArea: {
    width: "100%",
    backgroundColor: '#fff8dc',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  subheader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'left',
  },
  detailContainer: {
    flex: 1,
    width: '100%',
    marginTop: 10,
  },
  detail: {
    fontSize: 16,
    color: '#555',
    textAlign: 'left',
    lineHeight: 22,
  },
});
