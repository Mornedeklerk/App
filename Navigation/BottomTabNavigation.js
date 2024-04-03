import React from 'react';
import { View, ScrollView, Text, Button, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Define your screen components
const Screen1 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen 1 Content</Text>
  </View>
);

const Screen2 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen 2 Content</Text>
  </View>
);

const Screen3 = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Screen 3 Content</Text>
  </View>
);

// Define your existing HomeScreen component
const HomeScreen = ({ navigation }) => {
  const handleDeleteProduct = (productId) => {
    // Implement deletion logic
  };

  const products = [
    { id: 1, productname: 'Product 1', expiryDate: '2024-03-18' },
    { id: 2, productname: 'Product 2', expiryDate: '2024-03-19' },
    // Add more sample data as needed
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <Text>Reminders</Text>
        {products.map((product, index) => (
          <View key={product.id}>
            <TouchableOpacity onPress={() => handleDeleteProduct(product.id)}>
              <FontAwesomeIcon icon={faXmark} color='gray' size={20} />
            </TouchableOpacity>
            <Text>{product.productname}</Text>
            <Text>Expiry Date: {product.expiryDate}</Text>
          </View>
        ))}
      </ScrollView>
      <View>
        <Button title="Add Product" onPress={() => navigation.navigate('AddProduct')} />
      </View>
    </View>
  );
};

// Create bottom tab navigator
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Screen1" component={Screen1} />
        <Tab.Screen name="Screen2" component={Screen2} />
        <Tab.Screen name="Screen3" component={Screen3} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
