import { Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    // <View>
    //   <Text> AuthLayout</Text>
    // </View>
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='sign_in' options={{}} />
      <Stack.Screen name='sign_up' />
    </Stack>
  );
};

export default AuthLayout;
