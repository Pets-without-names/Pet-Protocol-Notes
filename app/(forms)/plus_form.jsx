import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { CheckBox, Card, Input, Button } from '@rneui/themed';
import { React, useState } from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { createPlusNote } from '../../appwrite/connections';
import { router } from 'expo-router';

const PlusForm = () => {
  const [form, setForm] = useState({
    name: '',
    barrier_reactive: false,
    dog_reactive: false,
    misc_notes: '',
    protocol_dated: dayjs(),
    cat_reactive: false,
    resource_guarder: false,
    stranger_reactive: false,
  });
  const [index, setIndex] = useState(0);
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    // Check for blank form fields:
    if (form.name === '' || form.date === null) {
      Alert.alert('please check the form');
      return;
    }
    setSubmitting(true);
    try {
      const result = await createPlusNote(form);
      Alert.alert('Note added');
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert('Error: ' + error.mesage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Input
            label='Name'
            labelStyle={styles.label}
            maxLength={25}
            autoCapitalize='words'
            value={form.name}
            onChangeText={(text) => setForm({ ...form, name: text })}
            placeholder='Enter name'
          />
          <DateTimePicker
            mode='single'
            date={form.protocol_dated}
            onChange={(params) => {
              setForm({ ...form, protocol_dated: params.date });
            }}
          />
          <Card>
            <Card.Title>Reactivity</Card.Title>
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
            <View>
              <CheckBox
                title='Barrier'
                size={24}
                checked={form.barrier_reactive}
                onPress={() =>
                  setForm({ ...form, barrier_reactive: !form.barrier_reactive })
                }
              />
            </View>
          </Card>
          <View>
            <CheckBox
              title='Resource Guarder'
              size={24}
              checked={form.resource_guarder}
              onPress={() =>
                setForm({ ...form, resource_guarder: !form.resource_guarder })
              }
            />
            <CheckBox
              title='Avoid Strangers'
              size={24}
              checked={form.stranger_reactive}
              onPress={() =>
                setForm({ ...form, stranger_reactive: !form.stranger_reactive })
              }
            />
          </View>
          <Input
            label='Notes'
            value={form.misc_notes}
            onChangeText={(text) => setForm({ ...form, misc_notes: text })}
            placeholder='enter notes'
            multiline={true}
            numberOfLines={5}
          />
          <Button
            onPress={() => {
              submit();
            }}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlusForm;

const styles = StyleSheet.create({
  container: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    padding: 20,
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
    alignItems: 'center',
  },
  button: {},
});
