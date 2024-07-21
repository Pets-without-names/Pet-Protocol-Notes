import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { router, useNavigation } from 'expo-router';
import SignIn from './(auth)/sign_in';
import { React, useEffect } from 'react';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h2 style={styles.text}>
          Landing Page
        </Text>
        <Button
          title='Log In'
          titleStyle={{
            fontStyle: 'italic',
          }}
          buttonStyle={{
            backgroundColor: 'darkgreen',
            borderWidth: 2,
            borderColor: 'black',
            borderRadius: 20,
          }}
          containerStyle={{
            width: '70%',
            marginHorizontal: 10,
            marginVertical: 10,
          }}
          onPress={() => router.push('/sign_in')}
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
});
