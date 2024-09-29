import { View, SafeAreaView, StyleSheet, Platform, Alert } from 'react-native';
import React, { useState } from 'react';
import { Text, Input, Button } from '@rneui/base';
import validator from 'validator';
import { createPwordRecovery } from '../../appwrite/connections';

const Recovery = () => {
  const [email, setEmail] = useState('');
  const [emailFocused, setEmailFocus] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleReset = async () => {
    //Check for blank email input:
    if (validator.isEmpty(email)) {
      Alert.alert('Enter your email address');
      setEmailFocus(true);
      return;
    }
    //Validate the submitted email format:
    if (!validator.isEmail(email)) {
      Alert.alert('Enter a valid email address');
      setEmailError('Enter a valid email address');
      setEmailFocus(true);
      return;
    } else {
      setEmailError('');
    }

    setSubmitting(true);
    try {
      //Only URLs from hostnames in your project platform list are allowed.
      const result = await createPwordRecovery(email, 'mydomain.com');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text h4 style={styles.banner}>
          Please enter your account email address.
        </Text>
        <Input
          value={email}
          label='email'
          labelStyle={styles.label}
          errorMessage={emailError}
          onChangeText={(text) => {
            if (validator.isEmail(text)) {
              setEmailError('');
            }
            setEmail(text);
          }}
          placeholder='  email address'
          onFocus={() => {
            setEmailFocus(true);
          }}
          onBlur={() => setEmailFocus(false)}
          keyboardType='email-address'
          style={{
            borderWidth: 1,
            borderRadius: 10,
            borderColor: emailFocused ? 'orange' : 'black',
          }}
          inputStyle={{ color: 'white', padding: 5 }}
          inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
        />
        <Button
          title='Reset'
          buttonStyle={styles.createButton}
          titleStyle={{ fontWeight: '600', paddingVertical: 2 }}
          containerStyle={styles.buttonContainer}
          onPress={() => {
            handleReset();
          }}
          loading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};

export default Recovery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31353D',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  inputContainer: {
    marginTop: 10,
    width: '95%',
    alignItems: 'center',
    padding: 10,
  },
  banner: {
    color: '#F6F4F3',
    marginTop: 50,
    textAlign: 'center',
    marginBottom: 40,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: 'white',
    opacity: 0.75,
  },
  createButton: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#68AE7F',
  },
  buttonContainer: {
    width: '75%',
    marginVertical: 20,
  },
});
