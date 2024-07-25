import {
  Client,
  Account,
  ID,
  Databases,
  Query,
  Storage,
} from 'react-native-appwrite';

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
const databases = new Databases(client);

// Register a new user:
export async function createAccount(firstName, lastName, email, password) {
  const userName = firstName + ' ' + lastName;
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      userName
    );
    if (!newAccount) throw Error;

    // await signIn(email, password);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

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
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

// Get Current User  DON'T NEED??? Or use to get the user's account?
export async function getCurrentAccount() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    return currentAccount;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign Out
export async function signOut() {
  try {
    const session = await account.deleteSession('current');

    return session;
  } catch (error) {
    throw new Error(error);
  }
}
