import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text } from '@rneui/themed';

const Home = () => {
  return (
    <SafeAreaView>
      <View>
        <Text h2 style={styles.text}>
          Protocol Notes
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
