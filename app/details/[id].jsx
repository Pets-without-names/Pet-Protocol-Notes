import { React, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert, View } from 'react-native';
import { Card, Text, Button, ListItem } from '@rneui/themed';
import { useLocalSearchParams, router } from 'expo-router';
import { deleteNote } from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';

const Details = () => {
  const params = useLocalSearchParams();
  //array to hold the information to display:
  const [details, setDetails] = useState([]);
  const detailsArray = [];
  //context for notes status change (add,update,delete):
  const { noteStatusChanged, setStatusChanged } = useGlobalContext();

  //Format the protocol date:
  const date = new Date(Date.parse(params.protocol_date));
  const formattedDate = `${date.toLocaleString('default', {
    month: 'short',
  })}-${date.getDate()}-${date.getFullYear()}`;

  //Iterate over the protocol details:
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
    }
  };

  const handleUpdate = async () => {
    router.replace({
      pathname: '../(forms)/update_form',
      params: params,
    });
  };

  useEffect(() => {
    compileDetails();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.outsideContainer}>
        <Card containerStyle={styles.cardContainer}>
          <Card containerStyle={styles.nameContainer}>
            {/* <Card.Title style={styles.name}>{params.name}</Card.Title> */}
            <Text style={styles.name}>{params.name}</Text>
          </Card>
          <Text style={{ textAlign: 'center', fontSize: 20 }}>
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
            onPress={() => {
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
              handleDelete(params.$id);
            }}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  outsideContainer: {
    flex: 1,
    alignItems: 'center',
    // backgroundColor: '#F6F4F3',
    backgroundColor: '#E1DFDF',
  },
  cardContainer: {
    width: '90%',
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
    fontSize: 28,
    fontWeight: '700',
    color: '#304D6D',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  updateButton: {
    //backgroundColor: 'green',
    backgroundColor: '#6A8E7F',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  deleteButton: {
    //backgroundColor: 'red',
    backgroundColor: '#AA767C',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  buttonContainer: {
    width: '45%',
  },
  icon: {
    marginLeft: 20,
  },
  text: {
    fontSize: 18,
  },
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 75,
  },
});

export default Details;
