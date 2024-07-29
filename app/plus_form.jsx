import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { CheckBox, Text, Card, Input, Button } from '@rneui/themed';
import { React, useState } from 'react';

const PlusForm = () => {
  const [name, setName] = useState('');
  const [index, setIndex] = useState(0);
  const [dogReactive, setDogReactive] = useState(false);
  const [barrierReactive, setBarrierReactive] = useState(false);
  const [resourceGuard, setResourceGuard] = useState(false);
  const [catReactive, setCatReactive] = useState(false);
  const [strangers, setStrangers] = useState(false);
  const [notes, setNotes] = useState('');

  return (
    <SafeAreaView>
      <ScrollView>
        <Input
          label='Name'
          maxLength={25}
          autoCapitalize='words'
          value={name}
          onChangeText={setName}
          placeholder='Enter name'
        />
        <Card>
          <Card.Title>Protocol Level</Card.Title>
          <Card.Divider />
          <Text h4>Protocol +</Text>
          {/* <CheckBox
            title='Protocol'
            checked={index === 0}
            onPress={() => setIndex(0)}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
          />
          <CheckBox
            title='Protocol +'
            checked={index === 1}
            onPress={() => setIndex(1)}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
          /> */}
        </Card>
        <Card>
          <Card.Title>Reactivity</Card.Title>
          <Card.Divider />
          <View style={styles.row}>
            <CheckBox
              title='Dog'
              size={24}
              checked={dogReactive}
              onPress={() => setDogReactive(!dogReactive)}
            />
            <CheckBox
              title='Cat'
              size={24}
              checked={catReactive}
              onPress={() => setCatReactive(!catReactive)}
            />
          </View>
          <View>
            <CheckBox
              title='Barrier'
              size={24}
              checked={barrierReactive}
              onPress={() => setBarrierReactive(!barrierReactive)}
            />
          </View>
        </Card>
        <View>
          <CheckBox
            title='Resource Guarder'
            size={24}
            checked={resourceGuard}
            onPress={() => setResourceGuard(!resourceGuard)}
          />
          <CheckBox
            title='Avoid Strangers'
            size={24}
            checked={strangers}
            onPress={() => setStrangers(!strangers)}
          />
        </View>
        <Input
          label='Notes'
          value={notes}
          onChangeText={setNotes}
          placeholder='enter notes'
          multiline={true}
          numberOfLines={5}
        />
        <Button onPress={() => {}}>Submit</Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlusForm;

const styles = StyleSheet.create({
  container: {},
  card: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {},
});
