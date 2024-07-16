import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerTitle: 'Protocol Notes' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text>Sample Notes</Text>
          </View>
        </ScrollView>
      </Stack.Screen>
    </SafeAreaView>
  );
};

export default Home;
