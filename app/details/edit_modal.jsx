import { View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Button } from '@rneui/base';
import { router } from 'expo-router';
import Modal from 'react-native-modal';

const EditModal = () => {
  const [visible, setVisible] = useState(false);

  return (
    // <View style={styles.buttonView}>
    //   <Button
    //     title='Update'
    //     titleStyle={{ fontSize: 20 }}
    //     icon={{
    //       name: 'update',
    //       type: 'fontawesome',
    //       size: 25,
    //       color: 'white',
    //     }}
    //     iconRight
    //     containerStyle={styles.buttonContainer}
    //     buttonStyle={styles.updateButton}
    //     // onPress={() => {
    //     //   handleUpdate();
    //     // }}
    //   />
    //   <Button
    //     title='Delete'
    //     titleStyle={{ fontSize: 20 }}
    //     icon={{
    //       name: 'delete',
    //       type: 'fontawesome',
    //       size: 25,
    //       color: 'white',
    //     }}
    //     iconRight
    //     containerStyle={styles.buttonContainer}
    //     buttonStyle={styles.deleteButton}
    //     // onPress={() => {
    //     //   handleDelete(params.$id);
    //     // }}
    //   />
    //   <Button
    //     title='Cancel'
    //     titleStyle={{ fontSize: 20 }}
    //     icon={{
    //       name: 'cancel',
    //       type: 'fontawesome',
    //       size: 25,
    //       color: 'white',
    //     }}
    //     iconRight
    //     containerStyle={styles.buttonContainer}
    //     buttonStyle={styles.deleteButton}
    //     onPress={() => router.back()}
    //     //onPress={() => setVisible(!visible)}
    //   />
    // </View>
    <Modal
      isVisible={showEditButtons}
      swipeDirection={'down'}
      onBackdropPress={() => setEditButtons(false)}
      onSwipeComplete={() => setEditButtons(false)}
      onModalHide={()=>{}}
      style={styles.modal}
    >
      <View style={styles.buttonView}>
        <Button
          title='Update'
          raised
          titleStyle={{ fontSize: 20 }}
          icon={{
            name: 'update',
            type: 'fontawesome',
            size: 25,
            color: 'white',
          }}
          iconRight
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.updateButton}
          onPress={() => {
            setEditButtons(false);
            handleUpdate();
          }}
        />
        <Button
          title='Delete'
          titleStyle={{ fontSize: 20 }}
          icon={{
            name: 'delete',
            type: 'fontawesome',
            size: 25,
            color: 'white',
          }}
          iconRight
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.deleteButton}
          onPress={() => {
            setEditButtons(false);
            handleDelete(params.$id);
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 90,
    right: 10,
  },
  buttonContainer: {
    //width: '45%',
  },
  updateButton: {
    backgroundColor: '#6A8E7F',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: '#AA767C',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 20,
  },
});
export default EditModal;
