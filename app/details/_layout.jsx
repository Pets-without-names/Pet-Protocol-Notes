import { Stack } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { router } from 'expo-router';
import { useState } from 'react';
import { useGlobalContext } from '../../context/GlobalProvider';

export default function DetailsLayout() {
  const { showEditButtons, setEditButtons } = useGlobalContext();

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
              onPress={() => setEditButtons(true)}
            >
              Edit
            </FontAwesome.Button>
          ),
        }}
      />
      <Stack.Screen name='edit_modal' options={{ presentation: 'modal' }} />
    </Stack>
  );
}
