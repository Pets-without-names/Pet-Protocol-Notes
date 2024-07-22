import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: '',
        headerBackTitle: 'back',
        headerShown: true,
      }}
    >
      <Stack.Screen name='index' />
      {/* <Stack.Screen name='(auth)' /> */}
    </Stack>
  );
};

export default RootLayout;
