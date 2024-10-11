import {
  StyleSheet,
  View,
  Alert,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Input, Button, Text, Divider } from '@rneui/themed';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { getAccount, signIn } from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import validator from 'validator';
import Modal from 'react-native-modal';

const SignIn = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [emailFocused, setEmailFocus] = useState(false);
  const [pwordFocused, setPwordFocus] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState('');

  const submit = async () => {
    //Check for blank email input:
    if (validator.isEmpty(form.email)) {
      Alert.alert('Enter your email address');
      setEmailFocus(true);
      return;
    }
    //Validate the submitted email format:
    if (!validator.isEmail(form.email)) {
      Alert.alert('Enter a valid email address');
      setEmailError('Enter a valid email address');
      setEmailFocus(true);
      return;
    } else {
      setEmailError('');
    }

    //Password validations:
    if (validator.isEmpty(form.password)) {
      Alert.alert('Please enter your password');
      setPwordFocus(true);
      return;
    }

    //this will trigger the button loading animation
    setSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const result = await getAccount();
      setUser(result);
      setIsLogged(true);
      router.replace('/home');
    } catch (error) {
      //errors only has a message and name...no type or code.
      Alert.alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    setShowModal(false);
  };

  return (
    <>
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
            errorMessage={emailError}
            onChangeText={(text) => {
              if (validator.isEmail(text)) {
                setEmailError('');
              }
              setForm({ ...form, email: text });
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
              borderColor: pwordFocused ? 'orange' : 'black',
            }}
            inputStyle={{ color: 'white', padding: 5 }}
            inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
          />
          <TouchableOpacity
            style={{ backgroundColor: 'green', padding: 5 }}
            onPress={() => setShowModal(true)}
          >
            <Text style={styles.password}>forgot password?</Text>
          </TouchableOpacity>
          <Button
            title='Log in'
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            containerStyle={styles.buttonContainer}
            loading={isSubmitting}
            onPress={() => {
              submit();
            }}
          />
        </View>

        <View style={styles.accountContainer}>
          <Divider width={2} color='#4357AD' style={styles.divider} />
          <Text h4 style={styles.subHeader}>
            Don't have an account?
          </Text>
          <Button
            title='Create Account'
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            containerStyle={styles.buttonContainer}
            onPress={() => {
              router.replace('/sign_up');
            }}
          />
        </View>
      </SafeAreaView>
      <Modal
        isVisible={showModal}
        animationIn={'fadeInRight'}
        animationOut={'slideOutRight'}
        backdropOpacity={0.9}
        onBackdropPress={() => showModal(false)}
      >
        <View>
          <Text style={{ color: 'white' }}>
            Please enter your account email to reset your password
          </Text>
          <Input
            value={form.email}//need to change
            label='email'
            labelStyle={styles.label}
            errorMessage={emailError}
            onChangeText={(text) => {
              if (validator.isEmail(text)) {
                setEmailError('');
              }
              setForm({ ...form, email: text });//need to change
            }}
            placeholder='  email address'
            // onFocus={() => {
            //   setEmailFocus(true);
            // }}
            //onBlur={() => setEmailFocus(false)}
            keyboardType='email-address'
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: emailFocused ? 'orange' : 'black',
            }}
            inputStyle={{ color: 'white', padding: 5 }}
            inputContainerStyle={{ borderWidth: 1, borderRadius: 10 }}
          />
          <Button onPress={handleForgotPassword}>Submit</Button>
        </View>
      </Modal>
    </>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#31353D',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
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
    fontFamily: 'ConcertOne-Regular',
    fontSize: Platform.OS === 'ios' ? 22 : 24,
    marginBottom: 5,
    color: 'white',
    opacity: 0.75,
  },
  header: {
    color: 'white',
    marginTop: 20,
    fontFamily: 'ConcertOne-Regular',
  },
  subHeader: {
    color: 'white',
    marginTop: 5,
    fontFamily: 'Urbanist-Regular',
    textAlign: 'center',
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
  buttonStyle: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#68AE7F',
  },
  titleStyle: {
    fontFamily: 'Urbanist-Medium',
    fontSize: Platform.OS === 'ios' ? 20 : 22,
    fontWeight: '600',
    paddingVertical: 2,
  },
  password: { color: 'white', fontSize: 18 },
});
