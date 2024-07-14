// import { Stack } from 'expo-router';

// const Layout = () => {
//   return (
//     <Stack
//       screenOptions={{
//         headerStyle: { backgroundColor: '#FFC0CB' },
//         headerTitle: 'Protocol Notes',
//         headerTitleStyle: {
//           // fontFamily: 'helvetica',
//           fontWeight: 'bold',
//         },
//       }}
//     >
//       <Stack.Screen name='index' />
//       <Stack.Screen name='/dogs/[id]' />
//     </Stack>
//   );
// };

// export default Layout;

import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    </Stack>
  );
}
