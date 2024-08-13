import { Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';

export default function DetailsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='[id]'
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (
            <FontAwesome.Button
              name='backward'
              backgroundColor='white'
              color='blue'
              onPress={() => router.back()}
            >
              Go Back
            </FontAwesome.Button>
          ),
        }}
      />
    </Stack>
  );
}
