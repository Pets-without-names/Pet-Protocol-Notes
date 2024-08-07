import { React, useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import DogNote from '../../components/DogNote';
import EmptyState from '../../components/EmptyState';
import { getProtocolPlusNotes } from '../../appwrite/connections';
import useAppwrite from '../../appwrite/useAppwrite';

const ProtocolPlusView = () => {
  const { data: notes, refetch } = useAppwrite(getProtocolPlusNotes);
  const [refreshing, setRefreshing] = useState(false);

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
          ListEmptyComponent={() => <EmptyState title='No dog notes' />}
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
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
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});
