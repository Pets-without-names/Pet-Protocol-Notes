import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text, Divider } from '@rneui/themed';
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
      <View style={styles.inputContainer}>
        <Input
          value={form.firstName}
          label='First Name'
          labelStyle={styles.label}
          onChangeText={(text) => setForm({ ...form, firstName: text })}
          placeholder='  First name'
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => setInputFocus(false)}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: inputFocused ? 'green' : 'black',
          }}
          inputStyle={{ color: 'white' }}
          inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
        />
        <Input
          value={form.lastName}
          label='Last Name'
          labelStyle={styles.label}
          onChangeText={(text) => setForm({ ...form, lastName: text })}
          placeholder='  Last Name'
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => setInputFocus(false)}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: inputFocused ? 'green' : 'black',
          }}
          inputStyle={{ color: 'white' }}
          inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
        />
        <Input
          value={form.email}
          label='email'
          labelStyle={styles.label}
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholder='  email address'
          onFocus={() => {
            setInputFocus(true);
          }}
          onBlur={() => setInputFocus(false)}
          keyboardType='email-address'
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: inputFocused ? 'green' : 'black',
          }}
          inputStyle={{ color: 'white' }}
          inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
        />
        <Input
          value={form.password}
          label='Password'
          labelStyle={styles.label}
          onChangeText={(text) => setForm({ ...form, password: text })}
          placeholder='  password'
          onFocus={() => setPwordFocus(true)}
          onBlur={() => setPwordFocus(false)}
          secureTextEntry={true}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: pwordFocused ? 'green' : 'black',
          }}
          inputStyle={{ color: 'white' }}
          inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
        />
        <Button
          title='Create an account'
          buttonStyle={{ borderRadius: 10, padding: 10 }}
          titleStyle={{ fontWeight: '600', paddingVertical: 2 }}
          containerStyle={styles.buttonContainer}
          loading={isSubmitting}
          onPress={() => {
            submit();
          }}
        />
      </View>
      <View style={styles.accountContainer}>
        <Divider width={2} color='#2089DC' style={styles.divider} />
        <Text h4 style={styles.label}>
          Already have an account?
        </Text>
        <Button
          title='Sign In'
          buttonStyle={{ borderRadius: 10, padding: 10 }}
          titleStyle={{ fontWeight: '600', paddingVertical: 2 }}
          containerStyle={styles.buttonContainer}
          onPress={() => router.replace('sign_in')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#31353D',
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: 'white',
    opacity: 0.75,
  },
  inputContainer: {
    marginTop: 10,
    width: '95%',
    alignItems: 'center',
    padding: 10,
  },
  accountContainer: {
    marginTop: 50,
    width: '95%',
    alignItems: 'center',
    padding: 10,
  },
  buttonContainer: {
    width: '75%',
    marginVertical: 20,
  },
  divider: {
    width: '85%',
    margin: 10,
    opacity: 0.65,
  },
});
