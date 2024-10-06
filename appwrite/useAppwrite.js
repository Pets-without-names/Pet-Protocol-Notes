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
      console.log('refetch notes error: ' + error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  //function to fetch individual dog note detail after the
  //user updates the note:
  const fetchNote = async (id) => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response.documents);
    } catch (error) {
      console.log('refetch note error: ' + error);
      throw new Error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNote();
    fetchNotes();
  }, []);

  const refetchNote = () => fetchNote();
  const refetch = () => fetchNotes();
  return { data, isLoading, refetch, refetchNote };
};

export default useAppwrite;
