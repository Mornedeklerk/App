import React, { useState,  } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { fetchProducts, saveProduct, deleteProducts, savelist } from './SQLite/Database';
import { useNavigation } from '@react-navigation/native';


 

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [ListName, setListName] = useState('');
  // const [expiryDate, setExpiryDate] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);
  const navigation = useNavigation();
  // const handleDateSelect = (day) => {
  //   setExpiryDate(day.dateString);
  //   setShowCalendar(false);
  // };

  const handleSaveProduct = () => {
    saveProduct(productName, expiryDate);
    
    // Reset input fields after saving
    setProductName('');
    // setExpiryDate('');

  };




  const handleSaveList = () => {
    savelist(ListName);
    
    
    // Reset input fields after saving
    setListName('');
    // setExpiryDate('');


  

  };
  return (
    <View style={styles.container}>
      <Text>Add List</Text>
      <TextInput
        value={ListName}
        onChangeText={setListName}
        style={styles.input}
      />
      {/* <Text>Expiry Date</Text>
      <TextInput
        value={expiryDate}
        onChangeText={setExpiryDate}
        style={styles.input}
        onFocus={() => setShowCalendar(true)}
        placeholder="Select expiry date"
      />
      
      {showCalendar && (
        <Calendar
          onDayPress={handleDateSelect}
          markedDates={{ [expiryDate]: { selected: true, selectedColor: 'blue' } }}
        />
      )} */}
      <Button title="Save List" color={'rgb(123,200,76)'} onPress={handleSaveList} />
      <Button title="Delete" color={'rgb(123,200,76)'} onPress={deleteProducts} />
     

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});


export default AddProduct;
