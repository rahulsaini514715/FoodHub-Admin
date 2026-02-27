import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import CategoriesStack from "./CategoriesStack";
import UsersScreen from "../screens/UsersScreen";
import OrdersStack from "./OrdersStack";

const Tab = createBottomTabNavigator();

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "CategoriesTab") {
            iconName = focused ? "list" : "list-outline";
          } else if (route.name === "Users") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "OrdersTab") {
            iconName = focused ? "cart" : "cart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor:"tomato",
        tabBarInactiveTintColor:"gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="CategoriesTab"
        component={CategoriesStack}
        options={{ title: "Categories" }}
      />
      <Tab.Screen
        name="Users"
        component={UsersScreen}
        options={{ title: "Users" }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStack}
        options={{ title: "Orders" }}
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});




// // RootNavigator.tsx
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import CategoriesStack from './CategoriesStack';
// import OrdersStack from './OrdersStack';
// import UsersScreen from '../screens/UsersScreen';
// // import UsersScreen from './UsersScreen';

// const Tab = createBottomTabNavigator();

// const RootNavigator = () => (
//   <Tab.Navigator screenOptions={{ headerShown: false }}>
//     <Tab.Screen name="CategoriesTab" component={CategoriesStack} />
//     <Tab.Screen name="OrdersTab" component={OrdersStack} />
//     <Tab.Screen name="UsersTab" component={UsersScreen} />
//   </Tab.Navigator>
// );

// export default RootNavigator;
