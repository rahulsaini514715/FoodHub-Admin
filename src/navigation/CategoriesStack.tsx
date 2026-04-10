import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoriesScreen from "../screens/CategoriesScreen";
import AddCategoryScreen from "../screens/AddCategoryScreen";
import ProductsScreen from "../screens/ProductsScreen";
import AddProductScreen from "../screens/AddProductScreen";
import EditCategory from "../screens/EditCategory";

const Stack = createNativeStackNavigator();

const CategoriesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "tomato" },
        headerTintColor: "white",
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ title: "Categories", headerTitleAlign: "center" }}
      />

      <Stack.Screen
        name="AddCategory"
        component={AddCategoryScreen}
        options={{ title: "AddCategory" }}
      />

      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={({ route }) => ({
          title: `Products in ${route.params?.categoryName ?? "Category"}`,
        })}
      />

      <Stack.Screen
        name="AddProduct"
        component={AddProductScreen}
        options={({ route }) => ({
          title: "Add Product",
        })}
      />

      <Stack.Screen
        name="EditCategory"
        component={EditCategory}
        options={({ route }) => ({
          title: "Edit Category",
        })}
      />

      
    </Stack.Navigator>
  );
};

export default CategoriesStack;

const styles = StyleSheet.create({});
