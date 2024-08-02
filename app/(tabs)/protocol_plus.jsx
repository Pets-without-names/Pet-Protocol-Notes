import { React, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import DogNote from '../../components/DogNote';
import EmptyState from '../../components/EmptyState';
import { getProtocolPlusNotes } from '../../appwrite/connections';
import useAppwrite from '../../appwrite/useAppwrite';

const ProtocolPlusView = ({ navigation }) => {
  const { data: notes, refetch } = useAppwrite(getProtocolPlusNotes);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);

  // const toggleDialog = () => {
  //   setVisible(!visible);
  // };

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
          renderItem={({ item }) => <DogNote dogInfo={item} />}
          keyExtractor={(item) => item.$id}
          ListEmptyComponent={() => <EmptyState title='No dog notes' />}
        />
      </SafeAreaView>
    </>
  );
};

export default ProtocolPlusView;