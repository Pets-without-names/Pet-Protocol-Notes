import { React, useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Text, Button, ListItem } from '@rneui/themed';
import { useLocalSearchParams, router } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { deleteNote } from '../../appwrite/connections';

const Details = () => {
  const params = useLocalSearchParams();
  //array to hold the information to display:
  const [details, setDetails] = useState([]);
  const detailsArray = [];

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
      router.back();
    } catch (error) {
      console.log('delete error: ' + error.message);
      throw new Error(error);
    }
  };

  useEffect(() => {
    compileDetails();
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.outsideContainer}>
        <Card containerStyle={styles.cardContainer}>
          <Card.Title style={styles.name}>{params.name}</Card.Title>
          <Card.Divider />
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

        <Button
          title='Delete'
          icon={{
            name: 'delete',
            type: 'fontawesome',
            size: 25,
            color: 'white',
          }}
          iconRight
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonStyle}
          onPress={() => {
            Alert.alert('Are you sure?');
            //handleDelete(params.$id);
          }}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  outsideContainer: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
    borderRadius: 10,
  },
  name: {
    fontSize: 28,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
  },
  buttonStyle: {
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  buttonContainer: {
    width: 200,
    marginTop: 15,
  },
  icon: {
    marginLeft: 20,
  },
  text: {
    fontSize: 18,
  },
});

export default Details;
