import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { Text } from '@rneui/themed';
import SignIn from './(auth)/sign_in';
import { React } from 'react';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h2 style={styles.text}>
          Landing Page
        </Text>
        <Text h3>Welcome message & disclaimer</Text>
        <SignIn />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightblue',
    height: '100%',
  },
  text: {
    marginTop: 50,
  },
  link: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 26,
    marginTop: 10,
  },
});
