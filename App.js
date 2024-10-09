// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import WelcomeScreen from './components/WelcomeScreen';
// import HeaderLittleLemon from './components/HeaderLittleLemon';
// import FooterLittileLemon from './components/FooterLittleLemon';
// import HomePage from './components/HomePage';
import Tabs from './navigation/tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesProvider } from './context/FavoritesContext';

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <FavoritesProvider>
      {/* <NavigationContainer> */}
        <Tabs />
      {/* </NavigationContainer> */}
    </FavoritesProvider>

  );
}

