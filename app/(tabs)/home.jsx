import {
  View,
  StyleSheet,
  Platform,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Text, Button, Card, Divider } from '@rneui/themed';
import { signOut } from '../../appwrite/connections';
import { useGlobalContext } from '../../context/GlobalProvider';
import { router } from 'expo-router';
import { getAvatar } from '../../appwrite/connections';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Home = () => {
  const { user, setUser, isLogged, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [avatar, setAvatar] = useState();

  const logOut = async () => {
    setSubmitting(true);
    await signOut();
    setUser(null);
    setIsLogged(false);
    setSubmitting(false);
    router.replace('/');
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
          size={Platform.OS === 'ios' ? 'large' : 50}
          color='blue'
          style={styles.activity}
        />
      ) : (
        <View style={styles.container}>
          <Text h2 style={styles.heading}>
            Protocol Notes
          </Text>
          <Divider width={2} color='#304D6D' style={styles.divider} />
          <Text h4 style={styles.text}>
            Create and update dog walking protocols!
          </Text>
          <Card containerStyle={styles.card}>
            <Text style={styles.title}>
              Please check-in with the ACE staff to verify the proper protocols
              and dates
            </Text>
          </Card>
          <Button
            buttonStyle={styles.button}
            containerStyle={styles.buttonContainer}
            title='Sign Out'
            titleStyle={styles.titleStyle}
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
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Urbanist-Medium',
    fontSize: 20,
    fontWeight: '600',
  },
  divider: {
    width: '85%',
    margin: 10,
    opacity: 0.65,
  },
  titleStyle: {
    fontFamily: 'Urbanist-Medium',
    fontSize: Platform.OS === 'ios' ? 20 : 22,
    fontWeight: '600',
    paddingVertical: 2,
    marginRight: 15,
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
});
