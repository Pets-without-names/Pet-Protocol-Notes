import { React, useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import DogNote from '../../components/DogNote';
import EmptyState from '../../components/EmptyState';
import { getProtocolNotes } from '../../appwrite/connections';
import useAppwrite from '../../appwrite/useAppwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const ProtocolView = () => {
  const { data: notes, refetch, isLoading } = useAppwrite(getProtocolNotes);
  const [refreshing, setRefreshing] = useState(false);
  const { noteStatusChanged, setStatusChanged } = useGlobalContext();
  const osName = Platform.OS;

  //refetch the data after a note has been added, updated, or deleted:
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
            ListEmptyComponent={() => <EmptyState title='No Protocol Notes' />}
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        )}
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
    alignItems: 'center',
    backgroundColor: '#F6F4F3',
    // backgroundColor: '#CCCED5',
  },
  activity: {
    marginTop: 50,
  },
  list: {
    width: '90%',
    marginTop: 20,
  },
});
