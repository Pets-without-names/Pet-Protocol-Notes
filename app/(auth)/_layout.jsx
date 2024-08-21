import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Loader from '../../components/Loader';
import { useGlobalContext } from '../../context/GlobalProvider';

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href='/home' />;
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='sign_in' />
        <Stack.Screen name='sign_up' />
      </Stack>
      <Loader isLoading={loading} />
      <StatusBar style='light' />
    </>
  );
};

export default AuthLayout;
