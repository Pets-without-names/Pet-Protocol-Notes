import { React, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { Dialog } from '@rneui/themed';
import { router } from 'expo-router';
import DogNote from '../../../components/DogNote';
import EmptyState from '../../../components/EmptyState';
import { getProtocolPlusNotes } from '../../../lib/appwrite';
import useAppwrite from '../../../lib/useAppwrite';
// import AddNoteForm from '../../../components/AddNoteForm';

const ProtocolPlusView = ({ navigation }) => {
  const { data: notes, refetch } = useAppwrite(getProtocolPlusNotes);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <>
      <SafeAreaView>
        <FlatList
          data={notes}
          renderItem={({ item }) => <DogNote name={item.name} />}
          keyExtractor={(item) => item.$id}
          ListEmptyComponent={() => <EmptyState title='No dog notes' />}
        />
      </SafeAreaView>
      {/* <Dialog
        isVisible={visible}
        onBackdropPress={toggleDialog}
        animationType='fade'
      >
        <AddNoteForm />
      </Dialog> */}
    </>
  );
};

export default ProtocolPlusView;
