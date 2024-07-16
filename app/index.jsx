import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

const index = () => {
  return (
    <View>
      <Text h2>Index Page</Text>
      <Link href={'./app/(tabs)/home'}>Go to Home Page</Link>
    </View>
  );
};

export default index;
