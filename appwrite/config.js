import { Client, Account, Databases, Avatars } from 'react-native-appwrite';
import {
  EXPO_PUBLIC_ENDPOINT,
  EXPO_PUBLIC_PROJECT_ID,
  EXPO_PUBLIC_PLATFORM,
} from '@env';

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(EXPO_PUBLIC_ENDPOINT)
  .setProject(EXPO_PUBLIC_PROJECT_ID)
  .setPlatform(EXPO_PUBLIC_PLATFORM);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

export { client, account, databases, avatars };
