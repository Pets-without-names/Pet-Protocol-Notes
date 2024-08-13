import { Stack } from 'expo-router';
// import GlobalProvider from '../context/GlobalProvider';

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: '',
        headerBackTitle: 'back',
        headerShown: false,
      }}
    >
      <Stack.Screen name='(tabs)' />
      <Stack.Screen name='(forms)' options={{ presentation: 'modal' }} />
    </Stack>
  );
};

export default RootLayout;
