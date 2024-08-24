import { React, useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import DogNote from '../../components/DogNote';
import EmptyState from '../../components/EmptyState';
import { getProtocolPlusNotes } from '../../appwrite/connections';
import useAppwrite from '../../appwrite/useAppwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const ProtocolPlusView = () => {
  const { data: notes, refetch, isLoading } = useAppwrite(getProtocolPlusNotes);
  const [refreshing, setRefreshing] = useState(false);
  const osName = Platform.OS;
  const { noteStatusChanged, setStatusChanged } = useGlobalContext();

  //refetch the data after a note has been added/deleted or updated:
  useFocusEffect(
    useCallback(() => {
      if (noteStatusChanged) {
        refetch();
        setStatusChanged(false);
      }
    }, [noteStatusChanged])
  );

  useEffect(() => {
    //refetch the data with the pull down functionality
    if (refreshing) {
      refetch();
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator
            size={osName === 'ios' ? 'large' : 50}
            color='blue'
            style={styles.activity}
          />
        ) : (
          <FlatList
            data={notes}
            style={styles.list}
            renderItem={({ item }) => <DogNote dogInfo={item} />}
            keyExtractor={(item) => item.$id}
            ListHeaderComponentStyle={styles.header}
            ListEmptyComponent={<EmptyState title='No dog notes' />}
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        )}
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
    alignItems: 'center',
  },
  activity: {
    marginTop: 50,
  },
  list: {
    width: '90%',
  },
});
