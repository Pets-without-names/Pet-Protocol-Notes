import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { React, useState } from 'react';
import { router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [inputFocused, setInputFocus] = useState(false);
  const [pwordFocused, setPwordFocus] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    //check form input fields are not null:
    if (
      form.firstName === '' ||
      form.lastName === '' ||
      form.email === '' ||
      form.password === ''
    ) {
      Alert.alert('Please fill in all fields');
    }
    setSubmitting(true);
    try {
      const result = await createUser(
        form.firstName,
        form.lastName,
        form.email,
        form.password
      );
      Alert.alert('Account created');
      router.replace('/');
    } catch (error) {
      Alert.alert('Error ' + error.message);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.outer}>
        <Input
          value={form.firstName}
          label='First Name'
          labelStyle={styles.label}
          onChangeText={(text) => setForm({ ...form, firstName: text })}
          placeholder='First name'
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => setInputFocus(false)}
          textAlign='center'
          containerStyle={styles.container}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: inputFocused ? 'orange' : 'black',
          }}
        />
        <Input
          value={form.lastName}
          label='Last Name'
          labelStyle={styles.label}
          onChangeText={(text) => setForm({ ...form, lastName: text })}
          placeholder='Last Name'
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => setInputFocus(false)}
          textAlign='center'
          containerStyle={styles.container}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: inputFocused ? 'orange' : 'black',
          }}
        />
        <Input
          value={form.email}
          label='email'
          labelStyle={styles.label}
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder='email address'
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => setInputFocus(false)}
          keyboardType='email-address'
          textAlign='center'
          containerStyle={styles.container}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: inputFocused ? 'orange' : 'black',
          }}
        />
        <Input
          value={form.password}
          label='Password'
          labelStyle={styles.label}
          onChangeText={(text) => setForm({ ...form, password: text })}
          placeholder='password'
          onFocus={() => setPwordFocus(true)}
          onBlur={() => setPwordFocus(false)}
          textAlign='center'
          containerStyle={styles.container}
          secureTextEntry={true}
          style={{
            borderWidth: 1,
            borderRadius: 5,
            borderColor: pwordFocused ? 'orange' : 'black',
          }}
        />
        <Button
          title='Create an account'
          style={styles.button}
          onPress={() => {
            submit();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  outer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    width: '100%',
    padding: 10,
    marginTop: 50,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
  },
  button: {
    padding: 10,
    width: '100%',
  },
});
