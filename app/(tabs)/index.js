// import { useState } from 'react';
// import { View, Text, SafeAreaView, Pressable } from 'react-native';
// import { Stack, useRouter } from 'expo-router';

// const Home = () => {
//   const router = useRouter();

//   return (
//     <SafeAreaView>
//       <Text>Main page</Text>
//       {/* <Pressable
//         onPress={() => {
//           router.push('/dogs/1');
//         }}
//       >
//         <Text>Go to dog notes for Artie</Text>
//       </Pressable> */}
//     </SafeAreaView>
//   );
// };

// export default Home;
import { View, Text, StyleSheet } from 'react-native';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Tab [Home|Protocol|Protocol+]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
