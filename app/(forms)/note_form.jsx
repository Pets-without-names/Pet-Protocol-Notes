import { View, StyleSheet, Alert } from 'react-native';
import {
  CheckBox,
  Card,
  Input,
  Button,
  Header,
  Icon,
  Text,
  FAB,
} from '@rneui/themed';
import { React, useState } from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import { createNote } from '../../appwrite/connections';
import { router, useLocalSearchParams } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';

const AddNoteForm = () => {
  const [form, setForm] = useState({
    name: '',
    barrier_reactive: false,
    dog_reactive: false,
    misc_notes: '',
    protocol_date: new Date(),
    cat_reactive: false,
    leash_reactive: false,
    resource_guarder: false,
    stranger_reactive: false,
    jumpy_mouthy: false,
    door_routine: false,
    place_routine: false,
  });

  const [isSubmitting, setSubmitting] = useState(false);
  const [nameError, setNameError] = useState(false);
  const params = useLocalSearchParams();
  const { noteStatusChanged, setStatusChanged } = useGlobalContext();

  //Validate user input to only allow certain characters:
  const handleInput = (text) => {
    setForm({ ...form, name: text.replace(/[^a-zA-Z. -]+/gi, '') });
    setNameError(false);
  };

  const submit = async () => {
    // Check for blank form fields:
    if (form.name === '') {
      Alert.alert('please enter a name');
      setNameError(true);
      return;
    }
    setSubmitting(true);
    try {
      const result = await createNote(params.collID, form);
      Alert.alert(`${result.name} added`);
      setStatusChanged(true);
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setNameError(false);
    }
  };

  return (
    <SafeAreaView>
      <Header
        containerStyle={styles.header}
        leftComponent={
          <Icon
            name='close'
            color='#F6F4F3'
            size={34}
            onPress={() => {
              router.back();
            }}
          />
        }
      />
      <KeyboardAwareScrollView extraScrollHeight={120}>
        <View style={styles.container}>
          <Input
            label='Name'
            labelStyle={styles.label}
            maxLength={25}
            autoCapitalize='words'
            value={form.name}
            onChangeText={(text) => {
              handleInput(text);
            }}
            placeholder='Enter name'
          />
          {nameError && (
            <Text h4 style={{ color: 'red' }}>
              Enter a name
            </Text>
          )}
          <DateTimePicker
            mode='single'
            date={form.protocol_date}
            onChange={(params) => {
              setForm({ ...form, protocol_date: params.date });
            }}
          />
          <Card containerStyle={{ width: '100%' }}>
            <Card.Title style={{ fontSize: 18 }}>Reactivity</Card.Title>
            <Card.Divider />
            <View style={styles.row}>
              <CheckBox
                title='Dog'
                size={24}
                checked={form.dog_reactive}
                onPress={() =>
                  setForm({ ...form, dog_reactive: !form.dog_reactive })
                }
              />
              <CheckBox
                title='Cat'
                size={24}
                checked={form.cat_reactive}
                onPress={() =>
                  setForm({ ...form, cat_reactive: !form.cat_reactive })
                }
              />
            </View>
            <View style={styles.row}>
              <CheckBox
                title='Barrier'
                size={24}
                checked={form.barrier_reactive}
                onPress={() =>
                  setForm({
                    ...form,
                    barrier_reactive: !form.barrier_reactive,
                  })
                }
              />
              <CheckBox
                title='Leash'
                size={24}
                checked={form.leash_reactive}
                onPress={() =>
                  setForm({
                    ...form,
                    leash_reactive: !form.leash_reactive,
                  })
                }
              />
            </View>
          </Card>
          <View style={{ width: '100%' }}>
            <CheckBox
              title='Jumpy/Mouthy'
              size={30}
              checked={form.jumpy_mouthy}
              onPress={() =>
                setForm({ ...form, jumpy_mouthy: !form.jumpy_mouthy })
              }
            />
            <CheckBox
              title='Resource Guarder'
              size={30}
              checked={form.resource_guarder}
              onPress={() =>
                setForm({ ...form, resource_guarder: !form.resource_guarder })
              }
            />
            <CheckBox
              title='Avoid Strangers'
              size={30}
              checked={form.stranger_reactive}
              onPress={() =>
                setForm({
                  ...form,
                  stranger_reactive: !form.stranger_reactive,
                })
              }
            />
            <CheckBox
              title='Place Routine'
              size={30}
              checked={form.place_routine}
              onPress={() =>
                setForm({
                  ...form,
                  place_routine: !form.place_routine,
                })
              }
            />
            <CheckBox
              title='Door Routine'
              size={30}
              checked={form.door_routine}
              onPress={() =>
                setForm({
                  ...form,
                  door_routine: !form.door_routine,
                })
              }
            />
          </View>
          <Input
            label='Other Notes'
            labelStyle={{
              fontWeight: 'bold',
              fontSize: 20,
              textAlign: 'center',
              marginTop: 25,
            }}
            value={form.misc_notes}
            onChangeText={(text) => setForm({ ...form, misc_notes: text })}
            placeholder='enter notes'
            multiline={true}
            numberOfLines={5}
          />
          <Button
            title='Submit'
            icon={{
              name: 'check',
              type: 'fontawesome',
              size: 25,
              color: 'white',
            }}
            iconRight
            containerStyle={styles.buttonContainer}
            buttonStyle={styles.button}
            onPress={() => {
              submit();
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      {/* <FAB
        title='Submit'
        color='#6A8E7F'
        size='large'
        // placement='right'
        icon={{
          name: 'check',
          type: 'fontawesome',
          size: 25,
          color: 'white',
        }}
        style={styles.fab}
        onPress={() => {
          submit();
        }}
      /> */}
    </SafeAreaView>
  );
};

export default AddNoteForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  card: {
    padding: 10,
    marginBottom: 20,
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#6A8E7F',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  buttonContainer: {
    width: 250,
    marginBottom: 25,
  },
  header: {
    backgroundColor: '#304D6D',
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30,
  },
});
