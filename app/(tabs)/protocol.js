import { React } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { Text, Card, Divider } from '@rneui/themed';

const dogData = [
  {
    id: '1',
    name: 'Barnsley',
  },
  {
    id: '2',
    name: 'Jackson',
  },
  { id: '3', name: 'Lilly' },
  {
    id: '4',
    name: 'Autumn',
  },
  {
    id: '5',
    name: 'Rossi',
  },
  {
    id: '6',
    name: 'Watford',
  },
  {
    id: '7',
    name: 'Paris',
  },
  { id: '8', name: 'Zoolander' },
  {
    id: '9',
    name: 'Victoria Beckham',
  },
];

const Dog = ({ name }) => (
  <Card>
    <Card.Title>{name}</Card.Title>
  </Card>
);

const ProtocolView = () => {
  return (
    <>
      <SafeAreaView>
        <Text h2 style={styles.text}>
          Protocol Dogs
        </Text>
        <Divider width={3} color='darkgray' />
        <FlatList
          data={dogData}
          renderItem={({ item }) => <Dog name={item.name} />}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </>
  );
};

export default ProtocolView;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  card: {},
});
