// import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { View, SafeAreaView, StyleSheet, Image } from 'react-native';
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
      <View style={styles.heading}>
        <Loader isLoading={loading} />
        <Text h2 style={styles.text}>
          Protocol Notes App!
        </Text>
        <View style={{ alignItems: 'center', marginTop: 25 }}>
          <Image
            source={require('../assets/images/walk-the-pet.png')}
            style={styles.image}
          />
        </View>

        <Text style={styles.subHeading}>
          A collaborative tool to stay updated on dog walking protocols.
        </Text>
        <Text style={styles.subHeading}>
          Create, Update or Delete notes for each protocol dog!
        </Text>
      </View>

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
  heading: {
    marginTop: 25,
    padding: 10,
  },
  text: {
    textAlign: 'center',
  },
  subHeading: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'blue',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 10,
  },
  buttonContainer: {
    width: 200,
    position: 'absolute',
    bottom: 100,
  },
  image: {
    width: 150,
    height: 150,
  },
});
