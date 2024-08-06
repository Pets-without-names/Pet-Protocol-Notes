import { React, useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Card, Text } from '@rneui/themed';
import { useLocalSearchParams } from 'expo-router';

const Details = () => {
  const params = useLocalSearchParams();
  const [data, setData] = useState([]);

  //Format the protocol date:
  const date = new Date(Date.parse(params.protocol_date));
  const formattedDate = `${date.getDate()}-${date.toLocaleString('default', {
    month: 'short',
  })}-${date.getFullYear()}`;

  //create an array of the protocol details:
  Object.entries(params).forEach((entry) => {
    const [key, value] = entry;
    // console.log(`${key}: ${value}`);
  });

  // const fetchDetails = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await getProtocolDetails(params.$id);
  //     setData(response);
  //   } catch (error) {
  //     console.log(error.message);
  //     throw new Error(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchDetails();
  // }, []);

  return (
    <>
      <ScrollView>
        <Card style={styles.container}>
          <Card.Title style={styles.name}>{params.name}</Card.Title>
          <Card.Divider />
          <Text h4>Protocol date: {formattedDate}</Text>
          <Text>{params.misc_notes}</Text>
        </Card>
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
    fontSize: 36,
  },
  notes: {
    fontSize: 18,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
});

export default Details;
