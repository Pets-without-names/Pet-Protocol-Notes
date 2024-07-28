import { View, StyleSheet, ScrollView } from 'react-native';
import { CheckBox, Text, Card, Input, Button } from '@rneui/themed';
import { React, useState } from 'react';

const AddNoteForm = () => {
  const [name, setName] = useState('');
  const [index, setIndex] = useState(0);
  const [dogReactive, setDogReactive] = useState(false);
  const [barrierReactive, setBarrierReactive] = useState(false);
  const [resourceGuard, setResourceGuard] = useState(false);
  const [catReactive, setCatReactive] = useState(false);
  const [strangers, setStrangers] = useState(false);
  const [notes, setNotes] = useState('');

  return (
    <ScrollView>
      <View>
        <Text h3>Protocol Notes</Text>
      </View>
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
        <CheckBox
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
        />
      </Card>
      <View>
        <CheckBox
          title='Dog Reactive'
          size={24}
          checked={dogReactive}
          onPress={() => setDogReactive(!dogReactive)}
        />
        <CheckBox
          title='Barrier Reactive'
          size={24}
          checked={barrierReactive}
          onPress={() => setBarrierReactive(!barrierReactive)}
        />
        <CheckBox
          title='Resource Guarder'
          size={24}
          checked={resourceGuard}
          onPress={() => setResourceGuard(!resourceGuard)}
        />
        <CheckBox
          title='Cat Reactive'
          size={24}
          checked={catReactive}
          onPress={() => setCatReactive(!catReactive)}
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
  );
};

export default AddNoteForm;

const styles = StyleSheet.create({
  container: {},
  button: {},
});
