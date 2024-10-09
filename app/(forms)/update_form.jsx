import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';

const UpdateForm = () => {
  const params = useLocalSearchParams();
  // console.log(params);
  const [form, setForm] = useState({
    barrier_reactive: params.barrier_reactive === 'true' ? true : false,
    dog_reactive: params.dog_reactive === 'true' ? true : false,
    misc_notes: params.misc_notes,
    protocol_date: params.protocol_date,
    cat_reactive: params.cat_reactive === 'true' ? true : false,
    leash_reactive: params.leash_reactive === 'true' ? true : false,
    resource_guarder: params.resource_guarder === 'true' ? true : false,
    stranger_reactive: params.stranger_reactive === 'true' ? true : false,
    jumpy_mouthy: params.jumpy_mouthy === 'true' ? true : false,
    door_routine: params.door_routine === 'true' ? true : false,
    place_routine: params.place_routine === 'true' ? true : false,
  });
  const [isSubmitting, setSubmitting] = useState(false);
  const { noteStatusChanged, setStatusChanged } = useGlobalContext();

  const submit = async () => {
    setSubmitting(true);
    try {
      const result = await updateNote(params.$collectionId, params.$id, form);
      Alert.alert(`${result.name} updated`);
      setStatusChanged(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      router.back();
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
        rightComponent={
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => submit()}
          >
            <Text style={{ color: 'white', fontSize: 16 }}>Update</Text>
          </TouchableOpacity>
        }
        rightContainerStyle={{
          justifyContent: 'center',
        }}
      />
      <KeyboardAwareScrollView extraScrollHeight={120}>
        <View style={styles.container}>
          <Card containerStyle={styles.nameContainer}>
            <Text style={styles.name}>{params.name}</Text>
          </Card>
          <Divider />
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
    </SafeAreaView>
  );
};

export default UpdateForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  nameContainer: {
    width: '95%',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginBottom: 20,
  },
  name: {
    fontFamily: 'ConcertOne-Regular',
    fontSize: 28,
    fontWeight: '700',
    color: '#304D6D',
    textAlign: 'center',
  },
  label: {
    textAlign: 'center',
    fontSize: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#6A8E7F',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  buttonContainer: { width: 250, marginBottom: 25 },
  header: {
    color: 'white',
    fontSize: 20,
    backgroundColor: '#304D6D',
  },
  headerButton: {
    backgroundColor: '#304D6D',
    color: 'white',
    padding: 0,
  },
});
