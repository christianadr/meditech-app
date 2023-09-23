import React from 'react';
import LandingPage from './views/landingPage';
import { useFonts } from 'expo-font';

export default function App() {

  const [loaded] = useFonts({
    "Inter-Bold": require('./assets/fonts/Inter-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <LandingPage />
  );
}
