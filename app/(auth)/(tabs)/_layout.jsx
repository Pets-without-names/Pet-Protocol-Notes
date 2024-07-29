import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { router } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: true }}>
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='home' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='protocol'
        options={{
          headerShown: true,
          headerRight: () => (
            <FontAwesome.Button
              name='plus'
              backgroundColor='white'
              color='blue'
              onPress={() => router.push('/note_form')}
            >
              Add Note
            </FontAwesome.Button>
          ),
          title: 'Protocol',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={28} name='dog' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='protocol_plus'
        options={{
          headerShown: true,
          title: 'Protocol +',
          headerRight: () => (
            <FontAwesome.Button
              name='plus'
              backgroundColor='white'
              color='blue'
              onPress={() => {
                router.push('/plus_form');
              }}
            >
              Add Note
            </FontAwesome.Button>
          ),
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='plus' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
