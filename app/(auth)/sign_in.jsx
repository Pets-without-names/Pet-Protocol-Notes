import { SafeAreaView, StyleSheet, View, Alert } from 'react-native';
import { Input, Button } from '@rneui/themed';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { getAccount, signIn } from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignIn = () => {
  // const { user, setUser, setIsLogged } = useGlobalContext();
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
      // await signIn(form.email, form.password);
      // const result = await getAccount();
      // setUser(result);//undefined
      // setIsLogged(true); //undefined

      Alert.alert('Success', 'User signed in successfully');
      router.replace('/home');
    } catch (error) {
      console.log(error);
      Alert.alert('Error ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.outer}>
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
          title='Log in'
          style={styles.button}
          onPress={() => {
            submit();
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

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
    width: 190,
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});
