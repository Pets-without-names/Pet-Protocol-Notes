import { SafeAreaView, StyleSheet, View, Pressable } from 'react-native';
import { Input, Text } from '@rneui/themed';
import { Link } from 'expo-router';
import React, { useState } from 'react';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputFocused, setInputFocus] = useState(false);
  const [pwordFocused, setPwordFocus] = useState(false);

  return (
    <SafeAreaView>
      <View style={styles.outer}>
        <Input
          value={email}
          label='email'
          labelStyle={styles.label}
          onChangeText={(text) => setEmail(text)}
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
          value={password}
          label='Password'
          labelStyle={styles.label}
          onChangeText={(text) => setPassword(text)}
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
        <Pressable>
          <Link replace href='/(tabs)/home' style={styles.button}>
            <Text h4>Log in</Text>
          </Link>
        </Pressable>
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
    width: '100%',
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 2,
  },
});
