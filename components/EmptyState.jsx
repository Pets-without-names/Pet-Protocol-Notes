import { View, StyleSheet } from 'react-native';
import { Text } from '@rneui/themed';

const EmptyState = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text h2>{title}</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    borderWidth: 2,
    borderColor: 'lightgray',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  title: {},
  subtitle: {},
});
