import { Stack } from 'expo-router';
import GlobalProvider from '../context/GlobalProvider';

const RootLayout = () => {
  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          headerTitle: '',
          headerBackTitle: 'back',
          headerShown: false,
        }}
      >
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='(forms)' options={{ presentation: 'modal' }} />
        <Stack.Screen name='index' />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
