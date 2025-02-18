import React from 'react';
import { Modal, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const ConfirmModal = ({ visible, onYes, onNo }) => {
  return (
    <Modal transparent animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Are you sure?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onYes}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onNo}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    borderRadius: 15,
    borderColor: "gray",
    borderBlockColor: "black"
  },
});

export default ConfirmModal;
