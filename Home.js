import React, { useEffect, useState, useFocusEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchProducts, createTables, deleteProduct, fetchList } from './SQLite/Database';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faHome } from '@fortawesome/free-solid-svg-icons/faHome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


import AddProductScreen from './AddProduct';


const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 100) / 1; // Width of each item, accounting for padding and margins

const Screen1 = () => {
  const [List, setList] = useState([]);
  const navigation = useNavigation();
  

  useEffect(() => {
    const subscribeFocus = navigation.addListener('focus', () => {
      fetchData(); // Fetch products when screen gains focus
    });

    createTables(); // Ensure tables are created when component mounts

    return subscribeFocus; // Cleanup the focus listener
  }, [navigation]);

  const fetchData = async () => {
    try {
      const fetchedList = await fetchList();
      setList(fetchedList);
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  };

  const handleDeleteProduct = async (ListId) => {
    try {
      await deleteProduct(ListId);
      fetchData(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
  
      <><View style={styles.container}>
        <Text style={styles.categoryTitle}>List</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
      
          <View  style={[styles.productContainer, styles.evenContainer]}>
            {/* <TouchableOpacity onPress={() => handleDeleteProduct(List.id)} style={styles.deleteIcon}>
              <FontAwesomeIcon icon={faXmark} color='gray' />
            </TouchableOpacity> */}
            
          
       
            <View style={styles.infoContainer}>
              
              <Text style={{ fontSize: 18 }}>Groceries</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12 }}>Quantity: 1</Text>
            </View>
            
            <View style={{alignSelf:'flex-end'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Groceries')}>
            <FontAwesomeIcon icon={faPlus} color='rgb(123,200,76)' size={20} />
            </TouchableOpacity>
            </View>

            
          </View>
          <View  style={[styles.productContainer, styles.evenContainer]}>
            {/* <TouchableOpacity onPress={() => handleDeleteProduct(List.id)} style={styles.deleteIcon}>
              <FontAwesomeIcon icon={faXmark} color='gray' />
            </TouchableOpacity> */}
            <View style={styles.infoContainer}>
              <Text style={{ fontSize: 18 }}>Cleaning Supplies</Text>
            </View>
            <View>
              <Text style={{ fontSize: 12 }}>Quantity: 1</Text>
            </View>
            <View style={{alignSelf:'flex-end'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Groceries')}>
            <FontAwesomeIcon icon={faPlus} color='rgb(123,200,76)' size={20} />
            </TouchableOpacity>
            </View>

            
          </View>
        
      
      </ScrollView>

    </View>
    {/* <Button title='Add Product' color={"rgb(123,200,76)"} onPress={() => navigation.navigate('AddProduct')}></Button> */}</>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  scrollContainer: {
    padding: 20, 
    justifyContent:'center',
    textAlign:'center',
    alignContent:'center',
    alignItems:'center',
    
  },
  productContainer: {
    marginBottom: 20,
    width: ITEM_WIDTH,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign:'center',
    alignContent:'center',
    alignItems:'center',
   
  },
  TotalQuantityTitle:{
    fontSize: 20,
    fontWeight: '900',
    display:'flex',
    padding: 10,
    color: "white",
    alignSelf:'center',
    marginRight:15,
    backgroundColor: 'rgb(123,200,76)', // Green color
    borderRadius: 100, // Make it circular
    width:50,
    height:50,
    textAlign:'center',
    justifyContent:'flex-end',
    
    
  },
  categoryTitle: {
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'left',
    padding: 10,
    color: "rgb(123,200,76)",
  },
  evenContainer: {
    marginLeft: 0,
  },
  infoContainer: {
    marginBottom: 5,
  },
  deleteIcon: {
    alignSelf: 'flex-end',
  },
});

// Create bottom tab navigator


export default Screen1;
