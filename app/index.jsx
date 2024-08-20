// import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Button } from '@rneui/themed';
import { Text } from '@rneui/base';
import { useGlobalContext } from '../context/GlobalProvider';
import Loader from '../components/Loader';

const Welcome = () => {
  const { loading, isLogged } = useGlobalContext();

  //the user is logged in and finished loading:
  if (!loading && isLogged) return <Redirect href='/home' />;

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loading} />
      <Text h3>Welcome page</Text>
      <Button
        title='Sign in'
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        onPress={() => {
          router.push('/sign_in');
        }}
      />
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#94C2FF',
  },
  heading: {},
  button: {
    backgroundColor: 'blue',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  buttonContainer: {
    width: 200,
    marginTop: 15,
  },
});
