import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text, Divider } from '@rneui/themed';
import { React, useState } from 'react';
import { router } from 'expo-router';
import { createAccount } from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';
import isEmail from 'validator/es/lib/isEmail';
import { AppwriteException } from 'react-native-appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { setUser, setIsLogged } = useGlobalContext();
  const [fnameFocused, setfnameFocused] = useState(false);
  const [lnameFocused, setlnameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [pwordFocused, setPwordFocused] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

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

    //Validate the sumbitted email format:
    if (!isEmail(form.email)) {
      Alert.alert('Enter a valid email address.');
      setEmailFocused(true);
      return;
    }

    //Strong password validation with regex:
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const strongPassword = regex.test(form.password);
    if (!strongPassword) {
      Alert.alert(
        'Password must be at least 8 characters. Contain one lower-case and one upper-case letter.  One digit and one special character.'
      );
      setPwordFocused(true);
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
      setUser(result);
      setIsLogged(true);
      Alert.alert('Account created');
      router.replace('/home');
    } catch (error) {
      Alert.alert(error.message);
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
          autoFocus={true}
          onFocus={() => {
            setfnameFocused(true);
          }}
          onBlur={() => setfnameFocused(false)}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: fnameFocused ? 'orange' : 'black',
          }}
          inputStyle={{ color: 'white', padding: 5 }}
          inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
        />
        <Input
          value={form.lastName}
          label='Last Name'
          labelStyle={styles.label}
          onChangeText={(text) => setForm({ ...form, lastName: text })}
          placeholder='  Last Name'
          onFocus={() => {
            setlnameFocused(true);
          }}
          onBlur={() => setlnameFocused(false)}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: lnameFocused ? 'orange' : 'black',
          }}
          inputStyle={{ color: 'white', padding: 5 }}
          inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
        />
        <Input
          value={form.email}
          label='email'
          labelStyle={styles.label}
          onChangeText={(text) => {
            setForm({ ...form, email: text });
          }}
          placeholder='  email address'
          onFocus={() => {
            setEmailFocused(true);
          }}
          onBlur={() => setEmailFocused(false)}
          enablesReturnKeyAutomatically={true}
          errorMessage={emailError}
          inputMode='email'
          keyboardType='email-address'
          textContentType='emailAdress'
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: emailFocused ? 'orange' : 'black',
          }}
          inputStyle={{ color: 'white', padding: 5 }}
          inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
        />
        <Input
          value={form.password}
          label='Password'
          labelStyle={styles.label}
          onChangeText={(text) => setForm({ ...form, password: text })}
          placeholder='  password'
          onFocus={() => setPwordFocused(true)}
          onBlur={() => setPwordFocused(false)}
          enablesReturnKeyAutomatically={true}
          secureTextEntry={true}
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: pwordFocused ? 'orange' : 'black',
          }}
          inputStyle={{ color: 'white', padding: 5 }}
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
