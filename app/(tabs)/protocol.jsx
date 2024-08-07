import { React, useState, useEffect, useCallback } from 'react';
import { StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { useFocusEffect } from 'expo-router';
import DogNote from '../../components/DogNote';
import EmptyState from '../../components/EmptyState';
import { getProtocolNotes } from '../../appwrite/connections';
import useAppwrite from '../../appwrite/useAppwrite';

const ProtocolView = () => {
  const { data: notes, refetch } = useAppwrite(getProtocolNotes);
  const [refreshing, setRefreshing] = useState(false);

  //refetch the data after a note has been added:
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [notes])
  );

  //refetch the data with the pull down functionality
  useEffect(() => {
    if (refreshing) {
      refetch();
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={notes}
          style={styles.list}
          renderItem={({ item }) => <DogNote dogInfo={item} />}
          keyExtractor={(item) => item.$id}
          ListHeaderComponentStyle={styles.header}
          ListEmptyComponent={() => <EmptyState title='No Protocol Notes' />}
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
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
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
