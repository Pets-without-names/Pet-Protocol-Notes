import { React } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Card, Button, ListItem } from '@rneui/themed';
import { ScrollView } from 'react-native';

const dogInfo = {
  name: 'Artie',
  note1: 'Barrier Reactive',
  note2: 'Resource Garder',
  note3: 'Place Routine',
  note4: 'Dog Reactive',
  note5: 'Practice door routine',
};

const infoArray = Object.entries(dogInfo);

const Protocol = () => {
  return (
    <>
      <ScrollView>
        <Card>
          <Card.Title>{dogInfo.name}</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri: `${dogInfo.image}`,
            }}
          />
          {infoArray.map((dog, index) => {
            return <Text key={index}>{dog[1]}</Text>;
          })}
        </Card>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  name: {
    fontSize: 16,
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default Protocol;
