import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Text, Button } from '@rneui/themed';
import SignIn from '../components/sign_in';
import { React } from 'react';
import { router } from 'expo-router';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h2 style={styles.text}>
          Landing Page
        </Text>
        <Text h3>Welcome message & disclaimer</Text>
        <SignIn />
        <Button
          title='Create an account'
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={() => {
            router.push('/sign_up');
          }}
        />
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
  button: {
    backgroundColor: 'blue',
    shadowColor: 'gray',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  buttonContainer: { marginTop: 20 },
});
