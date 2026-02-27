import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import CategoriesScreen from '../screens/CategoriesScreen';
import AddCategoryScreen from '../screens/AddCategoryScreen';

const Stack = createNativeStackNavigator();

const CategoriesStack = () => {
  return (
       <Stack.Navigator
         screenOptions={{
            headerStyle:{backgroundColor:"tomato"},
            headerTintColor:"white",
            headerTitleStyle:{fontWeight:"bold"}
         }}
       >
        <Stack.Screen name='Categories' component={CategoriesScreen} options={{title:"Categories",headerTitleAlign: "center"}}/>

         <Stack.Screen name='AddCategory' component={AddCategoryScreen} options={{title:"AddCategory"}}/>
    </Stack.Navigator>

  )
}

export default CategoriesStack

const styles = StyleSheet.create({})


// CategoriesStack.tsx
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View, Text } from 'react-native';

// const Stack = createNativeStackNavigator();

// const CategoriesScreen = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//     <Text>CategoriesScreen</Text>
//   </View>
// );

// const CategoriesStack = () => (
//   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     <Stack.Screen name="Categories" component={CategoriesScreen} />
//   </Stack.Navigator>
// );

// export default CategoriesStack;
