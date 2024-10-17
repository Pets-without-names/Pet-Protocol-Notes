import { databases } from './config';
import { ID } from 'react-native-appwrite';
import {
  EXPO_PUBLIC_DATABASE_ID,
  EXPO_PUBLIC_PROTOCOL_COLL_ID,
  EXPO_PUBLIC_PROTOCOL_PLUS_COLL_ID,
} from '@env';

const db = {};

const collections = [
  {
    databaseID: EXPO_PUBLIC_DATABASE_ID,
    id: EXPO_PUBLIC_PROTOCOL_COLL_ID,
    name: 'protocol',
  },
  {
    databaseID: EXPO_PUBLIC_DATABASE_ID,
    id: EXPO_PUBLIC_PROTOCOL_PLUS_COLL_ID,
    name: 'protocolPlus',
  },
];

collections.forEach((coll) => {
  db[coll.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      databases.createDocument(
        coll.databaseID,
        coll.id,
        id,
        payload,
        permissions
      ),
    update: (id, payload, permissions) =>
      databases.updateDocument(
        coll.databaseID,
        coll.id,
        id,
        payload,
        permissions
      ),
    delete: (id) => databases.deleteDocument(coll.databaseID, coll.id, id),
    list: (queries = []) =>
      databases.listDocuments(coll.databaseID, coll.id, queries),
    get: (id) => databases.getDocument(coll.databaseID, coll.id, id),
  };
});

export default db;
