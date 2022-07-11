import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEFAULT_API_URL = 'http://localhost:8080';

export default function useApiUrl() {
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);

  const readApiUrl = async () => {
    const apiUrlFromStorage = await AsyncStorage.getItem('apiUrl');
    setApiUrl(apiUrlFromStorage || DEFAULT_API_URL);
  };

  useEffect(() => {
    readApiUrl();
  }, []);

  return [apiUrl, setApiUrl];
}
