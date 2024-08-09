import { ID } from 'react-native-appwrite';
import { databases, account } from './config';
import { DATABASE_ID, PROTOCOL_COLL_ID, PROTOCOL_PLUS_COLL_ID } from '@env';
import db from './databases';

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

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    return currentAccount;
  } catch (error) {
    console.log('Getting account error: ' + error);
    return null;
  }
}

//User sign-in:
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
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

export const getProtocolDetails = async (id) => {
  try {
    const response = await db.protocol.get(id);
    return response; //returns a JSON object
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};
export const getPlusDetails = async (id) => {
  try {
    const response = await db.protocolPlus.get(id);
    return response; //returns a JSON object
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export async function getProtocolNotes() {
  try {
    const response = await db.protocol.list();
    return response.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getProtocolPlusNotes() {
  try {
    const response = await db.protocolPlus.list();
    return response.documents;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

//Create a new dog walking protocol:
export const createProtocolNote = async (data) => {
  try {
    const response = await db.protocol.create(data);
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const createPlusNote = async (data) => {
  try {
    const response = await db.protocolPlus.create(data);
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export const createNote = async (collID, data, docID = ID.unique()) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      collID,
      docID,
      data
    );
    return response;
  } catch (error) {
    console.log(`Create note error: ${error.message}`);
    throw new Error(error);
  }
};

export const deleteNote = async (collID, documentID) => {
  try {
    const result = await databases.deleteDocument(
      DATABASE_ID,
      collID,
      documentID
    );
    return result;
  } catch (error) {
    console.log('Delete error: ' + error.message);
    throw new Error(error);
  }
};
