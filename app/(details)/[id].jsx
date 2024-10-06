import { React, useState, useEffect, useCallback } from 'react';
import { StyleSheet, ScrollView, Alert, View } from 'react-native';
import { Card, Text, Button, ListItem } from '@rneui/themed';
import { useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import {
  deleteNote,
  getProtocolDetails,
  getPlusDetails,
} from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';
import Modal from 'react-native-modal';
import useAppwrite from '../../appwrite/useAppwrite';

const Details = () => {
  const params = useLocalSearchParams();
  //array to hold the notes information to display:
  const [details, setDetails] = useState([]);
  const [updateTriggered, setUpdateTriggered] = useState(false);
  const detailsArray = [];
  //context for notes status change (add,update,delete):
  const { noteStatusChanged, setStatusChanged } = useGlobalContext();
  const { showEditButtons, setEditButtons } = useGlobalContext();

  //Format the protocol date:
  const date = new Date(Date.parse(params.protocol_date));
  const formattedDate = `${date.toLocaleString('default', {
    month: 'short',
  })}-${date.getDate()}-${date.getFullYear()}`;

  //Iterate over the protocol details which sets
  //the information displayed to the user:
  function compileDetails() {
    Object.entries(params).forEach((entry) => {
      const [key, value] = entry;
      if (value === 'true') {
        switch (key) {
          case 'dog_reactive':
            detailsArray.push({ note: 'Dog Reactive' });
            break;
          case 'barrier_reactive':
            detailsArray.push({ note: 'Barrier Reactive' });
            break;
          case 'cat_reactive':
            detailsArray.push({ note: 'Cat Reactive' });
            break;
          case 'leash_reactive':
            detailsArray.push({ note: 'Leash Reactive' });
            break;
          case 'resource_guarder':
            detailsArray.push({ note: 'Resource Guarder' });
            break;
          case 'stranger_reactive':
            detailsArray.push({ note: 'Do not walk past strangers' });
            break;
          case 'jumpy_mouthy':
            detailsArray.push({ note: 'Jumpy/Mouthy' });
            break;
          case 'door_routine':
            detailsArray.push({ note: 'Practice Door Routine' });
            break;
          case 'place_routine':
            detailsArray.push({ note: 'Practice Place Routine' });
            break;
        }
      }
    });
    detailsArray.push({ note: params.misc_notes });
    setDetails(detailsArray);
  }

  const handleDelete = async (documentID) => {
    try {
      await deleteNote(params.$collectionId, documentID);
      Alert.alert(`${params.name} deleted`);
      setStatusChanged(true);
      router.back();
    } catch (error) {
      console.log('delete error: ' + error.message);
      throw new Error(error);
    } finally {
      //code goes here:
    }
  };

  //refetch the data after a note has been updated:
  // useFocusEffect(
  //   useCallback(() => {
  //     const protocolCollection = '66a04db400070bffec78';
  //     const plusCollection = '66a402a0003ddfe36884';
  //     if (noteStatusChanged) {//may need to use updateTriggered
  //       //need a function similar to refetch()
  //       if(params.id === protocolCollection){

  //       }
  //       setStatusChanged(false);
  //     }
  //   }, [noteStatusChanged])
  // );

  useEffect(() => {
    compileDetails();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.outsideContainer}>
        <Card containerStyle={styles.cardContainer}>
          <Card containerStyle={styles.nameContainer}>
            <Text style={styles.name}>{params.name}</Text>
          </Card>
          <Text
            style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}
          >
            Protocol date: {formattedDate}
          </Text>
          {details.map((item, i) => {
            return (
              <ListItem key={i} bottomDivider>
                <ListItem.Content style={{ alignItems: 'center' }}>
                  <Text style={styles.text}>{item.note}</Text>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </Card>
      </ScrollView>
      <Modal
        isVisible={showEditButtons}
        swipeDirection={'down'}
        onBackdropPress={() => setEditButtons(false)}
        onSwipeComplete={() => setEditButtons(false)}
        onModalHide={() => {
          //Needed set timeout to call handleUpdate so the modal
          //has plenty of time to close prior to handling the update.
          if (updateTriggered) {
            setTimeout(() => {
              router.replace({
                pathname: '../(forms)/update_form',
                params: params,
              });
            }, 100);
            setUpdateTriggered(false);
          }
        }}
        style={styles.modal} //nothing set yet
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
              setUpdateTriggered(true);
              //Sets the visibility of the modal to false:
              setEditButtons(false);
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
    </>
  );
};

const styles = StyleSheet.create({
  outsideContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E1DFDF',
  },
  cardContainer: {
    width: '95%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  nameContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginBottom: 20,
  },
  name: {
    fontFamily: 'ConcertOne-Regular',
    fontSize: 28,
    fontWeight: '700',
    color: '#304D6D',
    textAlign: 'center',
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
  buttonContainer: {
    width: '45%',
    borderRadius: 10,
    borderWidth: 0,
  },
  icon: {
    marginLeft: 20,
  },
  text: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 20,
  },
  buttonView: {
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: '20%',
    width: '95%',
    borderWidth: 1,
    borderColor: '#304D6D',
    borderRadius: 10,
    shadowColor: '#304D6D',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#E1DFDF',
  },
  modal: {},
});

export default Details;
