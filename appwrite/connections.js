import { ID } from 'react-native-appwrite';
import { client, databases, account } from './config';
import { DATABASE_ID, PROTOCOL_COLL_ID, PROTOCOL_PLUS_COLL_ID } from '@env';

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

export async function getProtocolNotes() {
  try {
    const protocolNotes = await databases.listDocuments(
      DATABASE_ID,
      PROTOCOL_COLL_ID
    );
    return protocolNotes.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getProtocolPlusNotes() {
  try {
    const plusNotes = await databases.listDocuments(
      DATABASE_ID,
      PROTOCOL_PLUS_COLL_ID
    );
    return plusNotes.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
