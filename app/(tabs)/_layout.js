import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome6 } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='home' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='protocol'
        options={{
          title: 'Protocol',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={28} name='dog' color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='protocolPlus'
        options={{
          title: 'Protocol +',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name='plus' color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
