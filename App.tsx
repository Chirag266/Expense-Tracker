import React, { useState } from 'react';
import LoginPage from './src/screens/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Homepage from './src/screens/HomePage/Homepage';
import { enableScreens } from 'react-native-screens';
import Categories from './src/screens/Categories/Categories';
import Addexpense from './src/screens/Add Expense/Addexpense';
import { CategoryProvider, useCategoryContext } from './src/components/CategoryContext';
import { TransactionProvider } from './src/context/TransactionContext';
enableScreens(true);
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <TransactionProvider>
   <NavigationContainer>
   <Stack.Navigator initialRouteName="Login">
     <Stack.Screen name="Login" component={LoginPage} />
     <Stack.Screen name="Home" component={Homepage} />
     <Stack.Screen name="Categories" component={Categories} />
     <Stack.Screen name="Addexpense" component={Addexpense} />
   </Stack.Navigator>
 </NavigationContainer>
 </TransactionProvider>
  )
  }

export default App;
