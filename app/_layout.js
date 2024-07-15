import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: 'back',
      }}
    >
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
