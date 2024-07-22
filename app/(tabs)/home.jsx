import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { Text, Button } from '@rneui/themed';

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
        <Button
          title='Add Protocol'
          buttonStyle={{
            borderRadius: 10,
            width: 250,
          }}
          onPress={() => {}}
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
});
