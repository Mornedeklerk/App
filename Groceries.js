import React, { useState,  useEffect, } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { fetchProducts, saveProduct, deleteProducts, savelist, createGrocerieTables, saveGrocerielist, fetchGrocerieList, deleteGrocerieProduct,handleDeleteProduct, deleteProduct } from './SQLite/Database';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';



const AddProduct = () => {
  const [groceryList, setGroceryList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const navigation = useNavigation();
 
    const totalQuantity = groceryList.length;
  
  useEffect(() => {
    const subscribeFocus = navigation.addListener('focus', () => {
      fetchData(); // Fetch products when screen gains focus
    });

    createGrocerieTables(); // Ensure tables are created when component mounts

    return subscribeFocus; // Cleanup the focus listener
  }, [navigation]);


  const fetchData = async () => {
    // Fetch grocery list from the database
    try {
      const fetchedList = await fetchGrocerieList();
      setGroceryList(fetchedList.map(item => ({ ...item, completed: false })));
      const totalQuantity = groceryList.length;
      
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  };

  const handleCompleteItem = (itemId) => {
    const updatedList = groceryList.map(item => {
      if (item.id === itemId) {
        const updatedItem = { ...item, completed: !item.completed };
        console.log('Updated item:', updatedItem); // Check if completion status is toggled
        return updatedItem;
      }
      return item;
    });
    setGroceryList(updatedList);
  };
  
  // Function to render items under their respective categories
  const renderItemsByCategory = () => {
    // Group items by category
    const groupedItems = groceryList.reduce((acc, item) => {
      if (!acc[item.Category]) {
        acc[item.Category] = [];
      }
      acc[item.Category].push(item);
      return acc;
    }, {});

    // Render items under their respective categories
    return Object.keys(groupedItems).map((category, index) => (
      <View key={index}>
       

        <Text style={styles.categoryTitle}>{category}</Text>
        {groupedItems[category].map((item, itemIndex) => (
          <TouchableOpacity key={itemIndex} onPress={() => handleCompleteItem(item.id)}>
           <View style={[styles.productContainer, itemIndex % 2 === 0 && styles.evenContainer, item.completed && styles.completedItem]}>
            <TouchableOpacity onPress={() => handleDeleteProduct(item.id)} style={styles.deleteIcon}>
              <FontAwesomeIcon icon={faXmark} color="gray" />
            </TouchableOpacity>
            <View style={styles.infoContainer}>
            <Text style={[styles.itemText, item.completed && styles.completedText]}>{item.Listname}</Text>
            </View>
          </View>
          
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  const handleDeleteProduct = async (itemId) => {
    try {
      await deleteGrocerieProduct(itemId);
      fetchData(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <View style={styles.container}>
    <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
              <Text style={styles.HeaderTitle}>Groceries List</Text>
              <Text style={styles.TotalQuantityTitle}>{totalQuantity}</Text>
              </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      

        {renderItemsByCategory()}
      </ScrollView>
      
      <TouchableOpacity title="Add" onPress={() => navigation.navigate('AddGroceriesItem')} style={styles.buttonContainer}>
        <View style={styles.contentContainer}>
          <FontAwesomeIcon icon={faPlus} color="#fff" size={30} />
        </View>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgb(123,200,76)', // Green color
    borderRadius: 50, // Make it circular
    width: 150,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // Add elevation for shadow effect (Android only)
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 25,
  },
  scrollContainer: {
    padding: 20,
  },
  productContainer: {
    marginBottom: 10,
    width: 350,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 25,
    fontWeight: 'normal',
    display: 'flex',
    padding: 5,
    color: 'white',
    flex: 1,
    backgroundColor:'rgb(123,200,76)',
    width: 350,
    borderRadius: 10,
    marginVertical:10,
    textAlign:'center',
  },
  HeaderTitle:{
    fontSize: 30,
    fontWeight: '900',
    display: 'flex',
    padding: 10,
    color: 'rgb(123,200,76)',
    flex: 1,
  },
  itemText:{
    fontSize:18,
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
  },

  evenContainer: {
    marginLeft: 0,
  },
  infoContainer: {
    marginBottom: 5,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'black',
  },
  completedItem: {
    backgroundColor: 'lightgrey',
  },
  deleteIcon: {
    alignSelf: 'flex-end',
  },
});

export default AddProduct;
