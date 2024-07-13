import { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Protocol from '../components/protocol';

const Home = () => {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerTitle: 'Protocol Notes' }} />
      <ScrollView showsVerticalScrollIndicator={true}>
        {/* <View>
          <Text style={{ textAlign: 'center' }}>Sample Notes</Text>
        </View> */}
        <Protocol />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
