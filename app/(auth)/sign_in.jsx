import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import FormField from '../../components/FormField';
import React, { useState } from 'react';

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  return (
    <SafeAreaView>
      <ScrollView>
        <FormField
          title='email'
          value={form.email}
          handleChangeText={(e) => {
            setForm(...form, e.email);
          }}
          keyboardType='email-address'
          placeholder='email address'
        />
        <FormField
          title='Password'
          value={form.password}
          handleChangeText={(e) => {
            setForm(...form, e.password);
          }}
          placeholder='password'
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;

const emailStyles = StyleSheet.create({});
