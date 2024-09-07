import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Text, Divider } from '@rneui/themed';
import React from 'react';

const messages = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text h3>User Posts</Text>
      </View>
    </SafeAreaView>
  );
};

export default messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderBottomColor: 'black',
    borderRadius: 5,
  },
});
