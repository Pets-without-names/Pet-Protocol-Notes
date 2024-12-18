import { ID } from 'react-native-appwrite';
import { databases, account, avatars } from './config';
import { DATABASE_ID } from '@env';
import db from './databases';
import { useState } from 'react';

// Register a new user:
export async function createAccount(firstName, lastName, email, password) {
  const name = firstName + ' ' + lastName;
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw Error;

    await signIn(email, password);
  } catch (error) {
    switch (error.type) {
      case 'user_already_exists':
        error.message = 'User with this email already exists.';
        throw error;
      case 'password_recently_used':
        error.message =
          'The password you are trying to use is similar to your previous password. For your security, please choose a different password and try again.';
        throw error;
      case 'password_personal_data':
        error.message =
          'The password you are trying to use contains references to your name or email. For your security, please choose a different password and try again.';
        throw error;
      case 'user_password_mismatch':
        error.message =
          'Passwords do not match. Please check the password and confirm password.';
        throw error;
      default:
        throw new Error(error);
    }
  }
}

// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;
    return currentAccount;
  } catch (error) {
    console.log('Getting account error: ' + error.code + ' ' + error);
    return null;
  }
}

//User sign-in:
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    if (
      error.type === 'user_invalid_credentials' ||
      //this will catch the password less than 8 characters:
      error.type === 'general_argument_invalid'
    ) {
      error.message =
        'Invalid credentials. Please check the email and password.';
      throw error;
    } else {
      throw new Error(error);
    }
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
    return response;
  } catch (error) {
    console.log(error.message);
    throw new Error(error);
  }
};

export async function getProtocolNotes() {
  try {
    const response = await db.protocol.list();
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getProtocolPlusNotes() {
  try {
    const response = await db.protocolPlus.list();
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

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

export const updateNote = async (collID, docID, data) => {
  try {
    const response = await databases.updateDocument(
      DATABASE_ID,
      collID,
      docID,
      data
    );
    return response;
  } catch (error) {
    console.log(`Update error: ${error.message}`);
    throw new Error(error);
  }
};

export async function deleteNote(collID, documentID) {
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
}

//User Avatar initials:
export async function getAvatar(user) {
  try {
    const avatarUrl = avatars.getInitials(user);
    return avatarUrl;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
