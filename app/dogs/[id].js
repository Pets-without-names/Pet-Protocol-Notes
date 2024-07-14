import { React } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { Card } from '@rneui/themed';

const dogInfo = {
  name: 'Artie',
  note1: 'Barrier Reactive',
  note2: 'Resource Garder',
  note3: 'Place Routine',
  note4: 'Dog Reactive',
  note5: 'Practice door routine.  OK to walk past strangers',
};

const infoArray = Object.entries(dogInfo);

const DogNotes = () => {
  return (
    <>
      <ScrollView>
        <Card style={styles.container}>
          <Card.Title style={styles.name}>{dogInfo.name}</Card.Title>
          <Card.Divider />
          <Card.Image
            style={styles.image}
            source={require('../../assets/images/artie.png')}
          />
          {infoArray.map((dog, index) => {
            return (
              <Text style={styles.notes} key={index}>
                {dog[1]}
              </Text>
            );
          })}
        </Card>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
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

export default DogNotes;
