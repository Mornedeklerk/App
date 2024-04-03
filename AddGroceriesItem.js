import React, { useState,  useEffect, } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import { fetchProducts, saveProduct, deleteProducts, savelist, createGrocerieTables, saveGrocerielist, fetchGrocerieList, deleteGrocerieProducts,handleDeleteProduct, deleteProduct } from './SQLite/Database';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';



 

const AddGroceriesItem = () => {
  const [productName, setProductName] = useState('');
  const [ListName, setListName] = useState('');
  const [List, setList] = useState([]);
  const [category, setCategory] = useState(''); // State for category
  
  // const [expiryDate, setExpiryDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const navigation = useNavigation();
  // const handleDateSelect = (day) => {
  //   setExpiryDate(day.dateString);
  //   setShowCalendar(false);
  // };
 
  const [selectedCategory, setSelectedCategory] = useState('');
  const [groceryList, setGroceryList] = useState([]);

  // Dummy grocery categories, replace with your actual categories
  const categories = ['Dairy', 'Bakery', 'Fruits', 'Vegetables', 'Beverages', 'Snacks', ];

  const handleCategorySelect = () => {
    setSelectedCategory(category);
    // Clear the category input after selection if needed
    // setCategory('');
  };
 
  

  useEffect(() => {
    const subscribeFocus = navigation.addListener('focus', () => {
      fetchData(); // Fetch products when screen gains focus
    });

    createGrocerieTables(); // Ensure tables are created when component mounts

    return subscribeFocus; // Cleanup the focus listener
  }, [navigation]);




  const fetchData = async () => {
    try {
      const fetchedList = await fetchGrocerieList();
      setList(fetchedList);
    } catch (error) {
      console.error('Error fetching list:', error);
    }
  };


  const handleSaveGrocerieList = async () => {
    await saveGrocerielist(ListName, category); // Save the list with the selected category
    setListName('');
    setCategory(''); // Reset category after saving
  };


    
  return (
    <>
      <View style={styles.container}>
            
               <View style={styles.container}>
      <Text style={styles.title}>Add Your List</Text>
      <TextInput
        value={ListName}
        onChangeText={setListName}
        style={styles.input}
        placeholder="List"
        placeholderTextColor="#999"
        textAlign='center'
      />
  <View style={styles.categoryContaine}>
        <Text style={styles.label}>Select Category:</Text>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select a category" value="" />
          {categories.map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>
        
      </View>
 
       </View>
    
          <TouchableOpacity style color={'rgb(123,200,76)'} onPress={handleSaveGrocerieList} />
          <TouchableOpacity title='Add' onPress={handleSaveGrocerieList} style={styles.buttonContainer}>
       <View style={styles.contentContainer}>
        <FontAwesomeIcon icon={faCheck} color="#fff" size={30} />
       
      </View>
            </TouchableOpacity>
          {/* <Button title="Delete" color={'rgb(123,200,76)'} onPress={deleteGrocerieProducts} /> */}


      </View>
          </>
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
      width: 60,
      height: 60,
      textAlign:'center',
      justifyContent:'center',
      elevation: 5, // Add elevation for shadow effect (Android only)
      flexDirection: 'row',
    },
    contentContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    
    
     
    },
    picker: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      marginBottom: 10,
      width:200,
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
      width: 350,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      textAlign:'center',
      alignContent:'center',
      alignItems:'center',
     
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
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      width: 200,
      marginBottom: 20,
      fontSize: 16,
      color: '#333',
    },
  });


export default AddGroceriesItem;
