import React from 'react';
import { Stack, Redirect } from 'expo-router';
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
    </>
  );
};

export default AuthLayout;
