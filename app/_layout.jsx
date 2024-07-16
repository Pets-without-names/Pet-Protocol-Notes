import { Stack, Slot } from 'expo-router';
import { SafeAreaView } from 'react-native';

const RootLayout = () => {
  return (
    <SafeAreaView>
      <Stack>
        <Stack.Screen
          name='index'
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default RootLayout;
