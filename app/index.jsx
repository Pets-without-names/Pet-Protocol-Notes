import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';
import { Link } from 'expo-router';
import React from 'react';

export default function App() {
  return (
    <SafeAreaView>
      <View>
        <Text h2 style={styles.text}>
          Landing Page
        </Text>
        <Link href='/home' style={styles.link}>
          Go to Home Page
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 16,
    marginTop: 10,
  },
});
