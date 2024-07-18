import { View, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { Text, Button } from '@rneui/themed';
import { Link, router } from 'expo-router';
import React from 'react';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.view}>
        <Text h2 style={styles.text}>
          Landing Page
        </Text>
        {/* <Link href='/home' style={styles.link}>
          Go to Home Page
        </Link> */}
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
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'lightblue',
    height: '100%',
  },
  text: {
    textAlign: 'center',
  },
  link: {
    textAlign: 'center',
    color: 'blue',
    fontSize: 26,
    marginTop: 10,
  },
});
