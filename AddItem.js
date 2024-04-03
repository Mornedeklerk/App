import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddItem = ({ }) => {
  const [itemName, setItemName] = useState('');
  const [inputtedData, setInputtedData] = useState(''); // State variable to store inputted data
  const navigation = useNavigation();

  const handleAddItem = () => {
    // Here, you can add the item to your data source
    // For example, you might use a function passed as a prop to update the list in the parent component
    // Assuming you have such a function, you can call it like this:
    // addItemToList(itemName);
    
    // Store the inputted data in state
    setInputtedData(itemName);
    
    // After adding the item, navigate back to the previous screen
    // navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Add Item</Text>
      <Text style={{ marginBottom: 20 }}>Inputted Data: {inputtedData}</Text>
      <TextInput
        style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10 }}
        onChangeText={text => setItemName(text)}
        value={itemName}
        placeholder="Enter item name"
      />
      <Button
        title="Add Item"
        onPress={handleAddItem}
        color={"rgb(123,200,76)"}
      />
    </View>
  );
};

export default AddItem;

