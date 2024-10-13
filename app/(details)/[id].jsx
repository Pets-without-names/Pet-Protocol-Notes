import { React, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert, View, Image } from 'react-native';
import { Card, Text, Button, ListItem } from '@rneui/themed';
import { useLocalSearchParams, router } from 'expo-router';
import { deleteNote } from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';
import Modal from 'react-native-modal';

const Details = () => {
  const params = useLocalSearchParams();
  //array to hold the notes information to display:
  const [details, setDetails] = useState([]);
  const [updateTriggered, setUpdateTriggered] = useState(false);
  const detailsArray = [];
  //context for notes status change (add,update,delete):
  const { showEditButtons, setEditButtons, setStatusChanged } =
    useGlobalContext();

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
    setEditButtons(false);
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

  const handleUpdate = () => {
    setEditButtons(false);
    setUpdateTriggered(true);
  };

  const deleteDialog = () => {
    Alert.alert('Confirm Delete', 'Confirm you want to deleted this note.', [
      { text: 'Cancel', onPress: () => setEditButtons(false), style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => handleDelete(params.$id),
        style: 'destructive',
      },
    ]);
  };

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
          <View style={styles.textWrap}>
            <Image style={styles.avatar} src={`${params.creator_avatar}`} />
            <Text style={styles.date}>Protocol date: {formattedDate}</Text>
          </View>
          {details.map((item, i) => {
            return (
              <ListItem key={i} bottomDivider>
                <ListItem.Content style={{ alignItems: 'center' }}>
                  <Text style={styles.item}>{item.note}</Text>
                </ListItem.Content>
              </ListItem>
            );
          })}
        </Card>
      </ScrollView>
      <Modal
        isVisible={showEditButtons}
        backdropOpacity={0.8}
        animationIn={'fadeInRight'}
        animationOut={'slideOutRight'}
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
            titleStyle={{ fontSize: 20, color: 'black' }}
            icon={{
              name: 'update',
              type: 'fontawesome',
              size: 25,
            }}
            iconRight
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.updateButton}
            onPress={() => {
              handleUpdate();
            }}
          />
          <Button
            title='Delete'
            titleStyle={{ fontSize: 20, color: 'black' }}
            icon={{
              name: 'delete',
              type: 'fontawesome',
              size: 25,
            }}
            iconRight
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.deleteButton}
            onPress={() => {
              deleteDialog();
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
    backgroundColor: '#E1DFDF',
  },
  deleteButton: {
    backgroundColor: '#E1DFDF',
    marginTop: 2,
  },
  buttonContainer: {},
  icon: {
    marginLeft: 20,
  },
  item: {
    fontFamily: 'Urbanist-Medium',
    fontSize: 18,
  },
  buttonView: {
    flexDirection: 'column',
    position: 'absolute',
    top: '10%',
    right: 0,
    width: '55%',
    borderWidth: 1,
    borderColor: '#304D6D',
    borderRadius: 10,
    shadowColor: '#304D6D',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    backgroundColor: '#E1DFDF',
  },
  modal: {},
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  textWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Details;
