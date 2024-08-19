import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { React, useState } from 'react';
import { router } from 'expo-router';
import { createAccount } from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { setUser, setIsLogged } = useGlobalContext();
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
      return;
    }
    //this will trigger the button loading animation
    setSubmitting(true);

    try {
      const result = await createAccount(
        form.firstName,
        form.lastName,
        form.email,
        form.password
      );
      setUser(result); //may not need this?
      setIsLogged(true);
      Alert.alert('Account created');
      router.replace('/home');
    } catch (error) {
      Alert.alert('Error ' + error.message);
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
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
          loading={isSubmitting}
          onPress={() => {
            submit();
          }}
        />
      </View>
      <View style={styles.card}>
        <Text h3>Already have an account?</Text>
        <Button
          title='Sign In'
          style={styles.button}
          onPress={() => router.push('sign_in')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  card: {
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
    width: '90%',
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
