import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Button, ButtonGroup } from '@rneui/themed';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.center}>
        <Text h2 style={styles.text}>
          Protocol Notes
        </Text>
        <Button
          title='Add Protocol'
          buttonStyle={{
            borderRadius: 10,
            width: 250,
          }}
          onPress={() => {
            console.log('protocol button pressed');
          }}
        />
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
  },
});
