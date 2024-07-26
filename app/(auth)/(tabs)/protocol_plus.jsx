import { React, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import DogNote from '../../../components/DogNote';
import EmptyState from '../../../components/EmptyState';
import { getProtocolPlusNotes } from '../../../lib/appwrite';
import useAppwrite from '../../../lib/useAppwrite';

const ProtocolPlusView = () => {
  const { data: notes, refetch } = useAppwrite(getProtocolPlusNotes);

  const [refreshing, setRefreshing] = useState(false);

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
          ListEmptyComponent={() => (
            <EmptyState
              title='No dog notes'
              subtitle='Go to the home screen to add notes'
            />
          )}
        />
      </SafeAreaView>
    </>
  );
};

export default ProtocolPlusView;
