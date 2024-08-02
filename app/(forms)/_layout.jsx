import React from 'react';
import { Stack } from 'expo-router';

const FormLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='note_form' />
      <Stack.Screen name='plus_form' />
    </Stack>
  );
};

export default FormLayout;