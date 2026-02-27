import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCategory } from "../api/apiClient";
import { useNavigation } from "@react-navigation/native";

type CategoryForm = {
  name: string;
  imageUrl?: string;
};

const AddCategoryScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryForm>({
    defaultValues: { name: "", imageUrl: "" },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: CategoryForm) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      navigation.goBack();
    },
  });

  const onSubmit = (data: CategoryForm) => {
    mutation.mutate({
      name: data.name,
      imageUrl: data.imageUrl || undefined,
    });
  };

  return (
    <View className="flex-1 bg-gray-50 p-4">
      <Text className="text-lg font-bold text-gray-900 mb-2">
        Add New Category
      </Text>

      <Text className="text-sm text-gray-600 mb-4">
        Give it a short, clear name
      </Text>

      <Text className="text-sm font-medium text-gray-700 mb-2">
        Category Name
      </Text>

      <Controller
        control={control}
        name="name"
        rules={{
          required: "Category name is required",
          minLength: { value: 2, message: "Too Short" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="E.g Beverages"
            value={value}
            onChangeText={onChange}
            className="bg-white p-3 rounded-lg border-gray-200"
          />
        )}
      />

      {errors.name && (
        <Text className="text-red-500 mt-2">
          {errors.name.message}
        </Text>
      )}

      <Text className="text-sm font-medium text-gray-700 mb-2 mt-4">
        Image URL
      </Text>

      <Controller
        control={control}
        name="imageUrl"
        rules={{
          pattern: {
            value: /^https?:\/\/.+/i,
            message: "Invalid URL",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="E.g https://example.com/image"
            value={value}
            onChangeText={onChange}
            className="bg-white p-3 rounded-lg border-gray-200"
          />
        )}
      />

      {errors.imageUrl && (
        <Text className="text-red-500 mt-2">
          {errors.imageUrl.message}
        </Text>
      )}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={mutation.isPending}
        className="mt-6 bg-black py-3 rounded-lg flex-row justify-center items-center"
      >
        <Ionicons name="save" size={18} color="#fff" />
        <Text className="text-white font-semibold ml-2">
          {mutation.isPending ? "Saving..." : "Create Category"}
        </Text>
      </Pressable>
    </View>
  );
};

export default AddCategoryScreen;

const styles = StyleSheet.create({});
