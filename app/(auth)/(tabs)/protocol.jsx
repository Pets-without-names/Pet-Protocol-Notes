import { React, useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  RefreshControl,
} from 'react-native';
import DogNote from '../../../components/DogNote';
import EmptyState from '../../../components/EmptyState';
import { getProtocolNotes } from '../../../lib/appwrite';
import useAppwrite from '../../../lib/useAppwrite';

const ProtocolView = () => {
  const { data: notes, refetch } = useAppwrite(getProtocolNotes);

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
          ListHeaderComponentStyle={styles.header}
          ListEmptyComponent={() => <EmptyState title='No Protocol Notes' />}
          RefreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </>
  );
};

export default ProtocolView;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
});
