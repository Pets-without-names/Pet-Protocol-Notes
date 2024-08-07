import { React, useState } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Text, Button } from '@rneui/themed';
import { useLocalSearchParams, router } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';
import { deleteNote } from '../../appwrite/connections';

const Details = () => {
  const params = useLocalSearchParams();
  const [data, setData] = useState([]);

  //Format the protocol date:
  const date = new Date(Date.parse(params.protocol_date));
  const formattedDate = `${date.getDate()}-${date.toLocaleString('default', {
    month: 'short',
  })}-${date.getFullYear()}`;

  console.log(formattedDate);

  //create an array of the protocol details:
  Object.entries(params).forEach((entry) => {
    const [key, value] = entry;
    // console.log(`${key}: ${value}`);
  });

  const handleDelete = async (documentID) => {
    try {
      const result = await deleteNote(params.$collectionId, documentID);
      Alert.alert(`${params.name} note deleted`);
      router.back();
    } catch (error) {
      console.log('delete error: ' + error.message);
      throw new Error(error);
    }
  };

  return (
    <>
      <ScrollView>
        <Card style={styles.container}>
          <Card.Title style={styles.name}>{params.name}</Card.Title>
          <Card.Divider />
          <Text h4>Protocol date: {formattedDate}</Text>
          <Text>{params.misc_notes}</Text>
        </Card>
        <Button
          style={styles.button}
          onPress={() => {
            handleDelete(params.$id);
          }}
        >
          Delete
          <FontAwesome6
            name='trash-can'
            size='24'
            color='white'
            style={styles.icon}
          />
        </Button>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 28,
  },
  notes: {
    fontSize: 18,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  button: {},
  icon: {
    marginLeft: 20,
  },
});

export default Details;
