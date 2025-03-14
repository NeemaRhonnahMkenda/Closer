import { initializeApp } from 'firebase/app';
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyARMoScCsdj1wplWoJcroU8LHCsYlJmzn8',
  authDomain: 'closerapp-a2d0d.firebaseapp.com',
  projectId: 'closerapp-a2d0d',
  storageBucket: 'closerapp-a2d0d.appspot.com',
  messagingSenderId: '839604020916',
  appId: '1:839604020916:android:c86c715703347d452859e1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export both `app` and `auth`
export { app, auth };
