import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useState, useEffect } from 'react';
import { Text, Button, Card } from '@rneui/themed';
import { signOut } from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getAvatar } from '../../appwrite/connections';

const Home = () => {
  const { user, setUser, isLogged, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [avatar, setAvatar] = useState();
  const osName = Platform.OS;

  const logOut = async () => {
    setSubmitting(true);
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace('/');
    setSubmitting(false);
  };

  useEffect(() => {
    const getInitials = async () => {
      try {
        const result = await getAvatar(user.name);
        setAvatar(result);
      } catch (error) {
        console.log(error);
      }
    };
    getInitials();
  }, []);

  return (
    <SafeAreaView>
      {isSubmitting ? (
        <ActivityIndicator
          size={osName === 'ios' ? 'large' : 50}
          color='blue'
          style={styles.activity}
        />
      ) : (
        <View style={styles.container}>
          <Text h2 style={styles.heading}>
            Protocol Notes
          </Text>
          <Text h4 style={styles.text}>
            Create and update dog walking protocols!
          </Text>
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.title}>
              <View style={styles.textWrap}>
                <Image style={styles.avatar} src={`${avatar}`} />
                <Text style={styles.title}> Welcome {user.name}!</Text>
              </View>
            </Card.Title>
            <Text style={styles.title}>
              Please check-in with the staff to verify the proper protocols and
              dates!
            </Text>
          </Card>
          <Button
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
      )}
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
  },
  heading: {
    fontFamily: 'ConcertOne-Regular',
    textAlign: 'center',
    padding: 10,
    marginTop: 40,
  },
  text: {
    fontFamily: 'Urbanist-Medium',
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
    borderRadius: 8,
    shadowColor: 'grey',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 10,
    padding: 10,
  },
  buttonContainer: {
    padding: 10,
    width: '55%',
    position: 'absolute',
    bottom: 45,
  },
  card: {
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
    elevation: 10,
  },
  title: {
    padding: 10,
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
    fontSize: 20,
    fontWeight: '600',
    marginLeft: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: '85%',
    margin: 10,
    opacity: 0.65,
  },
});
