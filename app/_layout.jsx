import { Stack } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';

const RootLayout = () => {
  return (
    // <GlobalProvider>
    <Stack
      screenOptions={{
        headerTitle: '',
        headerBackTitle: 'back',
        headerShown: true,
      }}
    >
      <Stack.Screen name='index' />
      <Stack.Screen name='(auth)' />
      <Stack.Screen
        name='note_form'
        options={{
          presentation: 'card',
          
        }}
      />
    </Stack>
    // </GlobalProvider>
  );
};

export default RootLayout;
