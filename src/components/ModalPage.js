import {StyleSheet, Text, View, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';

const ModalPage = () => {
  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  return (
    <View>
      <View>
        <TouchableOpacity onPress={showModal}>
          <Text>Open Modal</Text>
        </TouchableOpacity>
      </View>

      <Modal name="close" visible={openModal} animationType="fade">
        <Text>Displaying Modal</Text>
        <TouchableOpacity onPress={closeModal}>
          <Text>close</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ModalPage;
