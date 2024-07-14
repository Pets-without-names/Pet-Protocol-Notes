import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text } from '@rneui/themed';

export default function Tab() {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.text}>Home Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
