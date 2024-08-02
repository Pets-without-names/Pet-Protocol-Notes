import { Client, Account, Databases } from 'react-native-appwrite';
import { ENDPOINT, PROJECT_ID, PLATFORM_ID } from '@env';

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66a04859001d3df0988d')
  .setPlatform('com.petswithoutnames.protocols');

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };
