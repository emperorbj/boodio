import { Slot} from 'expo-router'
import React from 'react'
import { useEffect } from 'react'
import { useAuthStore } from '../../store/useAuthStore';
import Toast from 'react-native-toast-message';
import * as Linking from 'expo-linking';

const RootLayout = () => {
    if (typeof global.structuredClone !== 'function') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

    const { checkSession } = useAuthStore();
    useEffect(() => {
        checkSession();
        const subscription = Linking.addEventListener('url', ({ url }) => {
      console.log('Received deep link:', url);
    });

    return () => subscription.remove();
    }, []);

  return (
    <>
     <Slot />
     <Toast />
    </>
   
  )
}

export default RootLayout