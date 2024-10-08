import { Client, Account, Databases, Avatars } from 'react-native-appwrite';
import { ENDPOINT, PROJECT_ID, PLATFORM } from '@env';

// Init your React Native SDK
const client = new Client();

client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setPlatform(PLATFORM);

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

export { client, account, databases, avatars };
