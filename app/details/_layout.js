import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name='[id]' options={{ headerShown: false }} />
    </Stack>
  );
}
