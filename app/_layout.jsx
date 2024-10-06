import { Stack, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import GlobalProvider from '../context/GlobalProvider';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [loaded, error] = useFonts({
    'Urbanist-Regular': require('../assets/fonts/Urbanist-Regular.ttf'),
    'Urbanist-Medium': require('../assets/fonts/Urbanist-Medium.ttf'),
    'ConcertOne-Regular': require('../assets/fonts/ConcertOne-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <Stack
        screenOptions={{
          headerTitle: '',
          headerBackTitle: 'back',
          headerShown: false,
        }}
      >
        <Stack.Screen name='index' />
        <Stack.Screen name='(tabs)' />
        <Stack.Screen name='(forms)' options={{ presentation: 'modal' }} />
        <Stack.Screen name='(details)' />
      </Stack>
    </GlobalProvider>
  );
};

export default RootLayout;
