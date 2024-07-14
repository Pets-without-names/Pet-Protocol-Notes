import { React } from 'react';
import { StyleSheet, FlatList } from 'react-native';
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
const ProtocolPlusView = () => {
  return (
    <>
      <Text h2 style={styles.text}>
        Protocol+ Dogs
      </Text>
      <Divider width={3} />
      <FlatList
        data={dogData}
        renderItem={({ item }) => <Dog name={item.name} />}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default ProtocolPlusView;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
