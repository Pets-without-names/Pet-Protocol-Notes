import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { CheckBox, Text, Card, Input, Button } from '@rneui/themed';
import { React, useState } from 'react';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { createPlusNotes } from '../appwrite/connections';

const PlusForm = () => {
  const [form, setForm] = useState({
    name: '',
    dogReactive: false,
    barrierReactive: false,
    resourceGuard: false,
    catReactive: false,
    strangers: false,
    notes: '',
    date: dayjs(),
  });
  const [index, setIndex] = useState(0);
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    // Check for blank form fields:
    setSubmitting(true);
    try {
      const result = await createPlusNotes(
        form.name,
        form.barrierReactive,
        form.dogReactive,
        form.notes,
        form.date,
        form.catReactive,
        form.resourceGuard,
        form.strangers
      );
      Alert.alert('Note added');
      router.replace('/protocol_plus');
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
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.label}>Protocol +</Card.Title>
          </Card>
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
            date={form.date}
            onChange={(params) => {
              setForm({ ...form, date: params.date });
            }}
          />
          <Card>
            <Card.Title>Reactivity</Card.Title>
            <Card.Divider />
            <View style={styles.row}>
              <CheckBox
                title='Dog'
                size={24}
                checked={form.dogReactive}
                onPress={() =>
                  setForm({ ...form, dogReactive: !form.dogReactive })
                }
              />
              <CheckBox
                title='Cat'
                size={24}
                checked={form.catReactive}
                onPress={() =>
                  setForm({ ...form, catReactive: !form.catReactive })
                }
              />
            </View>
            <View>
              <CheckBox
                title='Barrier'
                size={24}
                checked={form.barrierReactive}
                onPress={() => setBarrierReactive(!form.barrierReactive)}
              />
            </View>
          </Card>
          <View>
            <CheckBox
              title='Resource Guarder'
              size={24}
              checked={form.resourceGuard}
              onPress={() =>
                setForm({ ...form, resourceGuard: !form.resourceGuard })
              }
            />
            <CheckBox
              title='Avoid Strangers'
              size={24}
              checked={form.strangers}
              onPress={() => setForm({ ...form, strangers: !form.strangers })}
            />
          </View>
          <Input
            label='Notes'
            value={form.notes}
            onChangeText={(text) => setForm({ ...form, notes: text })}
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
