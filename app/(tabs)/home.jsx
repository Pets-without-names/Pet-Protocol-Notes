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
          <Card.Title style={styles.title}>
            Please check-in with the staff to verify the proper protocols and
            dates
          </Card.Title>
        </Card>
        <Button
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
    backgroundColor: '#CCCED5',
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

  buttonContainer: {
    padding: 10,
    marginTop: 25,
    width: 190,
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 10,
    position: 'absolute',
    bottom: 35,
  },
  card: {
    backgroundColor: '#2B58ED',
    cornerRadius: '10',
    borderColor: 'black',
    borderWidth: '1',
    borderRadius: '10',
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    marginTop: 20,
  },
  title: {
    padding: 10,
    fontSize: 18,
    marginTop: 8,
    color: 'white',
  },
});
