import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome6 } from '@expo/vector-icons';
import { Tabs, router, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { PROTOCOL_COLL_ID, PROTOCOL_PLUS_COLL_ID } from '@env';
import { useGlobalContext } from '../../context/GlobalProvider';
import Loader from '../../components/Loader';

export default function TabLayout() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href='/sign-in' />;
  return (
    <>
      <Tabs
        screenOptions={{ tabBarActiveTintColor: '#4357AD', headerShown: false }}
      >
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
            headerStyle: { backgroundColor: '#F6F4F3' },
            headerRight: () => (
              <FontAwesome.Button
                name='plus'
                backgroundColor='#F6F4F3'
                color='#4357AD'
                onPress={() =>
                  router.push({
                    pathname: '../(forms)/note_form',
                    params: { collID: PROTOCOL_COLL_ID },
                  })
                }
              >
                ADD NOTE
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
            headerStyle: { backgroundColor: '#F6F4F3' },
            title: 'Protocol +',
            headerRight: () => (
              <FontAwesome.Button
                name='plus'
                backgroundColor='#F6F4F3'
                color='#4357AD'
                onPress={() => {
                  router.push({
                    pathname: '../(forms)/note_form',
                    params: { collID: PROTOCOL_PLUS_COLL_ID },
                  });
                }}
              >
                ADD NOTE
              </FontAwesome.Button>
            ),
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name='plus' color={color} />
            ),
          }}
        />
      </Tabs>
      <Loader isLoading={loading} />
      <StatusBar style='dark' />
    </>
  );
}
