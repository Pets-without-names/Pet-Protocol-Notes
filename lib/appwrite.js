import { Client, Account, ID } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.petswithoutnames.protocols',
  projectId: '66a04859001d3df0988d',
  databaseId: '66a04cba001cb48a5bd7',
  userCollectionId: '66a04d64003d3e895244',
  notesCollectionId: '66a04db400070bffec78',
  storageId: '66a13ec900121c0b73fb',
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);

export const createUser = async (firstName, lastName, email, password) => {
  // Register new user
  const userName = firstName + ' ' + lastName;
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      userName
    );
    if (!newAccount) throw Error;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//Create a new dog walking protocol:
export const createProtocol = async () => {
  try {
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

//User sign-in:
export async function signIn(email, password) {
  try {
    const session = await account.createEmailSession(email, password);

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
//Sign out:
