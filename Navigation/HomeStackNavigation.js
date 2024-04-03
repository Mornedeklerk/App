import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home';
import AddProduct from '../AddProduct';
import AddItem from '../AddItem';
import Groceries from '../Groceries';
import AddGroceriesItem from '../AddGroceriesItem';




const HomeStackNavigator = () => {
const Stack = createStackNavigator();
  return (
   
      <Stack.Navigator initialRouteName="Screen1" >
        <Stack.Screen name="Home" component={Home}  options={{ headerShown: false, }}  />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="Groceries" component={Groceries} options={{ headerShown: false, }} />
        <Stack.Screen name="AddGroceriesItem" component={AddGroceriesItem} />
      </Stack.Navigator>
   
    
  );
};

export default HomeStackNavigator;
