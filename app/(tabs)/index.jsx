import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Text } from '@rneui/themed';
import { useState } from 'react';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h2 style={styles.text}>
          Protocol Notes
        </Text>
        <Text h3 style={styles.text}>
          Staff check-in reminder!
        </Text>
        <ImageBackground
          style={styles.image}
          resizeMode='contain'
          source={require('../../assets/images/pawprint200.png')}
        />
      </View>
    </SafeAreaView>
  );
};
export default Home;

const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
  },

  text: {
    textAlign: 'center',
    padding: 10,
  },

  image: {
    height: 200,
    width: 200,
    resizeMode: 'contain',
    opacity: 0.6,
  },
  dialog: {},
});
