import { View, Text, StyleSheet, Modal } from 'react-native';
import React from 'react';
import { Button } from '@rneui/base';

const Drawer = () => {
  return (
    <Modal>
      <View style={styles.buttonView}>
        <Button
          title='Update'
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
          // onPress={() => {
          //   handleUpdate();
          // }}
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
          // onPress={() => {
          //   handleDelete(params.$id);
          // }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 55,
  },
  buttonContainer: {
    width: '45%',
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
  },
});
export default Drawer;
