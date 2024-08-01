import { databases } from './config';
import { ID } from 'appwrite';
import { DATABASE_ID, PROTOCOL_COLL_ID, PROTOCOL_PLUS_COLL_ID } from '@env';

const db = {};

const collections = [
  {
    dbId: DATABASE_ID,
    id: PROTOCOL_COLL_ID,
    name: 'protocol',
  },
  {
    dbID: DATABASE_ID,
    id: PROTOCOL_PLUS_COLL_ID,
    name: 'protocolPlus',
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      databases.createDocument(col.dbId, col.id, id, payload, permissions),
    update: (id, payload, permissions) =>
      databases.updateDocument(col.dbId, col.id, id, payload, permissions),
    delete: (id) => databases.deleteDocument(col.dbId, col.id, id),
    list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),
    get: (id) => databases.getDocument(col.dbId, col.id, id),
  };
});

export default db;

// Register a new user:
// export async function createAccount(firstName, lastName, email, password) {
//   const userName = firstName + ' ' + lastName;
//   try {
//     const newAccount = await account.create(
//       ID.unique(),
//       email,
//       password,
//       userName
//     );
//     if (!newAccount) throw Error;

//     // await signIn(email, password);
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// }

// //User sign-in:
// export async function signIn(email, password) {
//   try {
//     const session = await account.createEmailPasswordSession(email, password);
//     return session;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// // Get Account
// export async function getAccount() {
//   try {
//     const currentAccount = await account.get();
//     if (!currentAccount) throw Error;

//     return currentAccount;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// // Sign Out
// export async function signOut() {
//   try {
//     const session = await account.deleteSession('current');

//     return session;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// export async function getProtocolNotes() {
//   try {
//     const protocolNotes = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.protocolCollectionId
//     );
//     return protocolNotes.documents;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// }

// export async function getProtocolPlusNotes() {
//   try {
//     const plusNotes = await databases.listDocuments(
//       appwriteConfig.databaseId,
//       appwriteConfig.protocolPlusCollectionId
//     );
//     return plusNotes.documents;
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// }

// export async function createProtocolNotes(
//   name,
//   dog_reactive,
//   barrier_reactive,
//   misc_notes,
//   protocol_date,
//   cat_reactive,
//   resource_guarder,
//   stranger_reactive
// ) {
//   try {
//     const newPost = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.protocolPlusCollectionId,
//       ID.unique(),
//       {
//         name,
//         dog_reactive,
//         barrier_reactive,
//         misc_notes,
//         protocol_date,
//         cat_reactive,
//         resource_guarder,
//         stranger_reactive,
//       }
//     );
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// }

// export async function createPlusNotes(
//   name,
//   barrierReactive,
//   dogReactive,
//   notes,
//   date,
//   catReactive,
//   resourceGuard,
//   strangerReactive
// ) {
//   try {
//     const newPost = await databases.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.protocolPlusCollectionId,
//       ID.unique(),
//       name,
//       barrierReactive,
//       dogReactive,
//       notes,
//       date,
//       catReactive,
//       resourceGuard,
//       strangerReactive
//     );
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// }
