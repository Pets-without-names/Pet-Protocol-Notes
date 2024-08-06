import { React, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { router } from 'expo-router';
import DogNote from '../../components/DogNote';
import EmptyState from '../../components/EmptyState';
import { getProtocolPlusNotes } from '../../appwrite/connections';
import useAppwrite from '../../appwrite/useAppwrite';

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
          renderItem={({ item }) => <DogNote dogInfo={item} />}
          keyExtractor={(item) => item.$id}
          ListHeaderComponentStyle={styles.header}
          ListEmptyComponent={() => <EmptyState title='No dog notes' />}
          RefreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </>
  );
};

export default ProtocolPlusView;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
});
