import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useAppwrite = (fn) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response.documents);
    } catch (error) {
      console.log('refetch error: ' + error);
      Alert.alert('Error: ', error.message);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);

  const refetch = () => fetchNotes();
  return { data, isLoading, refetch };
};

export default useAppwrite;
