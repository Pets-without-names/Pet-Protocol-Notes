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
import {
  getAccount,
  signIn,
  recoverPassword,
} from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';
import { SafeAreaView } from 'react-native-safe-area-context';
import validator from 'validator';
import Modal from 'react-native-modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignIn = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [emailFocused, setEmailFocus] = useState(false);
  const [pwordFocused, setPwordFocus] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [validEmail, setValidEmail] = useState(false);

  const validateEmail = (email) => {
    //Check for blank email input:
    if (validator.isEmpty(email)) {
      Alert.alert('Enter your email address');
      setEmailFocus(true);
      setValidEmail(false);
      return;
    }
    //Validate the submitted email format:
    if (!validator.isEmail(email)) {
      Alert.alert('Enter a valid email address');
      setValidEmail(false);
      setEmailError('Enter a valid email address');
      setEmailFocus(true);
      return;
    } else {
      setEmailError('');
      setValidEmail(true);
    }
  };

  const submit = async () => {
    validateEmail(form.email);
    if (!validEmail) return;

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
      setValidEmail(false);
    }
  };

  const handlePwordRecovery = async () => {
    validateEmail(recoveryEmail);
    if (!validEmail) {
      return;
    } else {
      setSubmitting(true);
      try {
        //need to create file for redirect
        await recoverPassword(recoveryEmail);
        Alert.alert('check your email for password reset instructions');
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
        setValidEmail(false);
        setShowModal(false);
      }
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView
          extraScrollHeight={120}
          style={{ width: '100%' }}
          contentContainerStyle={{ alignItems: 'center' }}
        >
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
            <TouchableOpacity onPress={() => setShowModal(true)}>
              <Text style={styles.password}>Forgot Password?</Text>
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
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <Modal
        isVisible={showModal}
        animationIn={'fadeInRight'}
        animationOut={'slideOutRight'}
        backdropOpacity={0.9}
        onBackdropPress={() => setShowModal(false)}
      >
        <View style={styles.modalView}>
          <Text
            h4
            style={{ color: 'white', textAlign: 'center', marginBottom: 25 }}
          >
            Please enter your account email to reset your password
          </Text>
          <Input
            value={recoveryEmail}
            label='email'
            labelStyle={styles.label}
            errorMessage={emailError}
            onChangeText={(text) => {
              if (validator.isEmail(text)) {
                setEmailError('');
              }
              setRecoveryEmail(text);
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
            title='Submit'
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
            containerStyle={styles.buttonContainer}
            loading={isSubmitting}
            onPress={handlePwordRecovery}
          />
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
    fontSize: Platform.OS === 'ios' ? 20 : 22,
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
    opacity: 0.8,
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
  modalView: {
    alignItems: 'center',
    position: 'absolute',
    top: '20%',
  },
});
