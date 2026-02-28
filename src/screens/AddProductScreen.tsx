// import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import React from "react";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { Controller, useForm } from "react-hook-form";
// import { Ionicons } from "@expo/vector-icons";
// import { QueryClient, useMutation } from "@tanstack/react-query";
// import { createProduct } from "../api/apiClient";

// type FormData = {
//   name: string;
//   price: string;
//   imageUrl?: string;
//   description?: string;
// };

// const AddProductScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { categoryId } = (route?.params as any) ?? { categoryId: "" };
//   const {
//     control,
//     handleSubmit,
//     formState: { error },
//   } = useForm<FormData>({
//     defaultValues: { name: "", price: "", imageUrl: "", description: "" },
//   });


//   const mutation = useMutation({
//     mutationFn: (data: FormData) => createProduct({ ...data, price: parseFloat(data.name), categoryId }),
//     onSuccess: () => {
//       // Invalidate the product list for this category so it refetches
//       QueryClient.invalidateQueries({ queryKey: ['products', categoryId] });
//       navigation.goBack(); // Go back to previous screen
//     },
//     onError: (error) => {
//       console.error("Create product error:", error);
//       Alert.alert("Error", "Failed to create product");
//     }
//   })

//   const onSubmit = (data : FormData) => {
//     if(!data.name || !data.price || !data.imageUrl) return;
//     mutation.mutate(data);
//   }
//   return (
//     <ScrollView className="flex-1 bg-gray-50 p-4">
//       <Text className="text-lg font-bold text-gray-900 mb-2">
//         Add New Product
//       </Text>

//       <Text className="text-sm text-gray-600 mb-4">
//         Fill Product Details Below
//       </Text>

//       <Text className="text-sm font-medium text-gray-700 mb-2">
//         Product Name
//       </Text>
//       <Controller
//         control={control}
//         name="name"
//         rules={{ required: "Product name is required" }}
//         render={({ field: { onChange, value } }) => (
//           <TextInput
//             placeholder="E.g Cold Coffee"
//             value={value}
//             onChangeText={onChange} // <-- use parentheses, not array
//             className="bg-white p-3 rounded-lg border border-gray-200"
//           />
//         )}
//       />
//       {error?.name && (
//         <Text className="text-red-500 mt-2">{error.name.message}</Text>
//       )}

//       <Text className="text-sm font-medium text-gray-700 mb-2 mt-2">Price</Text>
//       <Controller
//         control={control}
//         name="price"
//         rules={{
//           required: "Price is required",
//           pattern: {
//             value: /^\d+(\.\d{1,2})?$/, // lowercase 'value' ✅
//             message: "Invalid price",
//           },
//         }}
//         render={({ field: { onChange, value } }) => (
//           <TextInput
//             placeholder="E.g 99.99"
//             value={value}
//             onChangeText={onChange} // <-- use parentheses, not array
//             keyboardType="numeric"
//             className="bg-white p-3 rounded-lg border border-gray-200"
//           />
//         )}
//       />
//       {error?.price && (
//         <Text className="text-red-500 mt-2">{error.price.message}</Text>
//       )}


//       <Text className="text-sm font-medium text-gray-700 mb-2 mt-2">Image URL</Text>
//       <Controller
//         control={control}
//         name="imageUrl"
//         rules={{
//           required: "Image Url is required",
//         }}
//         render={({ field: { onChange, value } }) => (
//           <TextInput
//             placeholder="Image URL"
//             value={value}
//             onChangeText={onChange} // <-- use parentheses, not array
//             className="bg-white p-3 rounded-lg border border-gray-200"
//           />
//         )}
//       />
//       {error?.imageUrl && (
//         <Text className="text-red-500 mt-2">{error.imageUrl.message}</Text>
//       )}


//       <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Description (Optional)</Text>
//       <Controller
//         control={control}
//         name="description"
//         render={({ field: { onChange, value } }) => (
//           <TextInput
//             placeholder="Short Description"
//             value={value}
//             onChangeText={onChange} // <-- use parentheses, not array
//             multiline
//             className="bg-white p-3 rounded-lg border border-gray-200 h-28 text-top"
//           />
//         )}
//       />
//       <TouchableOpacity 
//         onPress={handleSubmit(onSubmit)}
//         className="mt-6 bg-black p-3 rounded-lg flex-row items-center justify-center"
//       >
//         <Ionicons name="save" size={18} color="#fff" />
//         <Text className="text-white font-semibold ml-2">Create Product</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default AddProductScreen;

// const styles = StyleSheet.create({});


import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/apiClient";

type FormData = {
  name: string;
  price: string;
  imageUrl?: string;
  description?: string;
};

const AddProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryId } = (route?.params as any) ?? { categoryId: "" };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { name: "", price: "", imageUrl: "", description: "" },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: FormData) =>
      createProduct({ ...data, price: parseFloat(data.price), categoryId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", categoryId] });
      navigation.goBack();
    },
    onError: (error) => {
      console.error("Create product error:", error);
      Alert.alert("Error", "Failed to create product");
    },
  });

  const onSubmit = (data: FormData) => {
    if (!data.name || !data.price || !data.imageUrl) return;
    mutation.mutate(data);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      <Text className="text-lg font-bold text-gray-900 mb-2">Add New Product</Text>
      <Text className="text-sm text-gray-600 mb-4">Fill Product Details Below</Text>

      {/* Product Name */}
      <Text className="text-sm font-medium text-gray-700 mb-2">Product Name</Text>
      <Controller
        control={control}
        name="name"
        rules={{ required: "Product name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="E.g Cold Coffee"
            value={value}
            onChangeText={onChange}
            className="bg-white p-3 rounded-lg border border-gray-200"
          />
        )}
      />
      {errors.name && <Text className="text-red-500 mt-2">{errors.name.message}</Text>}

      {/* Price */}
      <Text className="text-sm font-medium text-gray-700 mb-2 mt-2">Price</Text>
      <Controller
        control={control}
        name="price"
        rules={{
          required: "Price is required",
          pattern: {
            value: /^\d+(\.\d{1,2})?$/,
            message: "Invalid price",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="E.g 99.99"
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
            className="bg-white p-3 rounded-lg border border-gray-200"
          />
        )}
      />
      {errors.price && <Text className="text-red-500 mt-2">{errors.price.message}</Text>}

      {/* Image URL */}
      <Text className="text-sm font-medium text-gray-700 mb-2 mt-2">Image URL</Text>
      <Controller
        control={control}
        name="imageUrl"
        rules={{ required: "Image Url is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Image URL"
            value={value}
            onChangeText={onChange}
            className="bg-white p-3 rounded-lg border border-gray-200"
          />
        )}
      />
      {errors.imageUrl && <Text className="text-red-500 mt-2">{errors.imageUrl.message}</Text>}

      {/* Description */}
      <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">Description (Optional)</Text>
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Short Description"
            value={value}
            onChangeText={onChange}
            multiline
            className="bg-white p-3 rounded-lg border border-gray-200 h-28 text-top"
          />
        )}
      />

      {/* Create Product Button */}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        className="mt-6 bg-black p-3 rounded-lg flex-row items-center justify-center"
      >
        <Ionicons name="save" size={18} color="#fff" />
        <Text className="text-white font-semibold ml-2">Create Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({});