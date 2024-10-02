import { Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router, Link } from 'expo-router';
import { Alert } from 'react-native';
import { useState } from 'react';

export default function DetailsLayout() {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };

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
          headerRight: () => (
            <FontAwesome.Button
              name='edit'
              backgroundColor='#E1DFDF'
              color='#4357AD'
              onPress={() =>
                router.push({
                  pathname: '../(cards)/drawer',
                })
              }
            >
              Edit
            </FontAwesome.Button>
          ),
        }}
      />
      {/* <Stack.Screen
        name='Drawer'
        options={{
          presentation: 'card',
        }}
      /> */}
    </Stack>
  );
}
