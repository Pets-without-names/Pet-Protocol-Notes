import { View, StyleSheet, Alert } from 'react-native';
import { React, useState } from 'react';
import {
  CheckBox,
  Card,
  Input,
  Button,
  Header,
  Icon,
  Text,
  Divider,
} from '@rneui/themed';
import DateTimePicker from 'react-native-ui-datepicker';
import { updateNote } from '../../appwrite/connections';
import { router, useLocalSearchParams } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const UpdateForm = () => {
  const params = useLocalSearchParams();
  // console.log(params);
  const [form, setForm] = useState({
    barrier_reactive: params.barrier_reactive === 'true' ? true : false,
    dog_reactive: params.dog_reactive === 'true' ? true : false,
    misc_notes: params.misc_notes,
    protocol_date: params.protocol_date,
    cat_reactive: params.cat_reactive === 'true' ? true : false,
    resource_guarder: params.resource_guarder === 'true' ? true : false,
    stranger_reactive: params.stranger_reactive === 'true' ? true : false,
    jumpy_mouthy: params.jumpy_mouthy === 'true' ? true : false,
    door_routine: params.door_routine === 'true' ? true : false,
    place_routine: params.place_routine === 'true' ? true : false,
  });
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    setSubmitting(true);
    try {
      const result = await updateNote(params.$collectionId, params.$id, form);
      Alert.alert(`${result.name} updated`);
      router.back();
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaProvider>
      <Header
        containerStyle={styles.header}
        leftComponent={
          <Icon
            name='close'
            size={24}
            onPress={() => {
              router.back();
            }}
          />
        }
        centerComponent={<Text style={styles.header}>{params.name}</Text>}
      />
      <KeyboardAwareScrollView extraScrollHeight={120}>
        <View style={styles.container}>
          <Text h3 style={styles.nameText}>
            {params.name}
          </Text>
          <Divider />
          <DateTimePicker
            mode='single'
            date={form.protocol_date}
            onChange={(params) => {
              setForm({ ...form, protocol_date: params.date });
            }}
          />
          <Card containerStyle={{ width: '100%' }}>
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
                  setForm({
                    ...form,
                    barrier_reactive: !form.barrier_reactive,
                  })
                }
              />
              <CheckBox
                title='Jumpy/Mouthy'
                size={24}
                checked={form.jumpy_mouthy}
                onPress={() =>
                  setForm({
                    ...form,
                    jumpy_mouthy: !form.jumpy_mouthy,
                  })
                }
              />
            </View>
          </Card>
          <View style={{ width: '100%' }}>
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
                setForm({
                  ...form,
                  stranger_reactive: !form.stranger_reactive,
                })
              }
            />
            <CheckBox
              title='Place Routine'
              size={24}
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
              size={24}
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
            labelStyle={{ fontWeight: 'bold', fontSize: 20 }}
            value={form.misc_notes}
            onChangeText={(text) => setForm({ ...form, misc_notes: text })}
            placeholder='enter notes'
            multiline={true}
            numberOfLines={5}
          />
          <Button
            title='Update'
            icon={{
              name: 'update',
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
    </SafeAreaProvider>
  );
};

export default UpdateForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
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
    alignItems: 'center',
  },
  nameText: {
    width: '90%',
    textAlign: 'center',
    marginBottom: 20,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    backgroundColor: 'green',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  buttonContainer: { width: 250, marginBottom: 25 },
  header: {
    color: 'white',
    fontSize: 20,
  },
});
