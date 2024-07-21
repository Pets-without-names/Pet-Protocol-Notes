import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='sign_in' />
      <Stack.Screen name='sign_up' />
    </Stack>
  );
};

export default AuthLayout;
