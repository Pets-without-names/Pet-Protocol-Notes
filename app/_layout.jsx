import { Slot, Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Slot>
      <Stack
        screenOptions={{
          headerBackTitle: 'back',
          headerShown: true,
        }}
      >
        <Stack.Screen
          name='index'
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name='(auth)'
          options={{
            iheaderShown: false,
          }}
        />
      </Stack>
    </Slot>
  );
};

export default RootLayout;
