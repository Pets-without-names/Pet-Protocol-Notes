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
          headerStyle: { backgroundColor: '#CCCED5' },
          headerLeft: () => (
            <FontAwesome.Button
              name='backward'
              backgroundColor='#CCCED5'
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
