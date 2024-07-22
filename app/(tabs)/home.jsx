import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Button, ButtonGroup } from '@rneui/themed';

const Home = () => {
  return (
    <SafeAreaView>
      <View style={styles.center}>
        <Text h2 style={styles.text}>
          Protocol Notes
        </Text>
        <Text h3 style={styles.text}>
          Information to check in with the staff
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
    padding: 10,
  },
  center: {
    alignItems: 'center',
  },
});
