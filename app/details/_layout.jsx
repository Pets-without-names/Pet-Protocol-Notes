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
          headerStyle: { backgroundColor: '#E1DFDF' },
          headerLeft: () => (
            <FontAwesome.Button
              name='backward'
              backgroundColor='#E1DFDF'
              color='#4357AD'
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
