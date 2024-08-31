import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { Input, Button, Text, Divider, CheckBox } from '@rneui/themed';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { getAccount, signIn } from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [inputFocused, setInputFocus] = useState(false);
  const [pwordFocused, setPwordFocus] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getAccount();
      setUser(result);
      setIsLogged(true);
      router.replace('/home');
    } catch (error) {
      console.log(error);
      Alert.alert('Error ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text h3 style={styles.header}>
          Account Log-in
        </Text>
        <Text h4 style={styles.subHeader}>
          Welcome back!
        </Text>
      </View>
      <View style={styles.inputContainer}>
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
          inputStyle={{ color: 'white', padding: 5 }}
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
          inputStyle={{ color: 'white', padding: 5 }}
          inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
        />
        <CheckBox title='Remember Me' />
        <Button
          title='Log in'
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
        <Text h4 style={styles.subHeader}>
          Don't have an account?
        </Text>
        <Button
          title='Create Account'
          buttonStyle={{ borderRadius: 10, padding: 10 }}
          titleStyle={{ fontWeight: '600', paddingVertical: 2 }}
          containerStyle={styles.buttonContainer}
          onPress={() => {
            router.replace('/sign_up');
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#31353D',
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
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: 'white',
    opacity: 0.75,
  },
  header: {
    color: 'white',
    marginTop: 20,
  },
  subHeader: {
    color: 'white',
    marginTop: 5,
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
