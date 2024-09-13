import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Text, Button, Card } from '@rneui/themed';
import { signOut } from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Home = () => {
  const { user, setUser, isLogged, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);

  const logOut = async () => {
    setSubmitting(true);
    await signOut();
    setUser(null);
    setIsLogged(false);
    setSubmitting(false);
    router.replace('/');
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text h2 style={styles.heading}>
          Protocol Notes
        </Text>
        <Text h4 style={styles.text}>
          Create and update dog walking protocols!
        </Text>
        <Card containerStyle={styles.card}>
          {/* <Card.Title style={styles.title}>
            Please check-in with the staff to verify the proper protocols and
            dates
          </Card.Title> */}
          <Text style={styles.title}>
            Please check-in with the staff to verify the proper protocols and
            dates
          </Text>
        </Card>
        <Button
          // color={'#6A8E7F'}
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          title='Sign Out'
          titleStyle={{ marginRight: 15 }}
          icon={<FontAwesome name='sign-out' size={24} color='white' />}
          iconRight
          onPress={() => logOut()}
          loading={isSubmitting}
        />
      </View>
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F6F4F3',
    // backgroundColor: '#CCCED5',
  },
  heading: {
    textAlign: 'center',
    padding: 10,
    marginTop: 40,
  },
  text: {
    textAlign: 'center',
    padding: 20,
  },
  imageText: {
    color: 'green',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 40,
  },
  button: {
    backgroundColor: '#6A8E7F',
    borderRadius: 5,
  },
  buttonContainer: {
    padding: 10,
    marginTop: 25,
    width: 190,
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    position: 'absolute',
    bottom: 35,
  },
  card: {
    //backgroundColor: '#2B58ED',
    //backgroundColor: '#4357AD',
    backgroundColor: '#304D6D',
    cornerRadius: '10',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginTop: 20,
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: '600',
  },
});
