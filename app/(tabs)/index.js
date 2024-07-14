import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text } from '@rneui/themed';

export default function Tab() {
  return (
    <SafeAreaView>
      <View>
        <Text h2 style={styles.text}>
          Protocol Notes
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
  },
});
