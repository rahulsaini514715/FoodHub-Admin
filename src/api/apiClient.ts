import axios from "axios";

// const API_BASE_URL = "http://localhost:3001/api/v1";
const API_BASE_URL = "http://192.168.1.33:3001/api/v1";


export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Categories API
export const fetchCategories = async () => {
  const res = await api.get("/categories");
  return res.data;
};

export const fetchCategory = async (id: string) => {
  const res = await api.get(`/categories/${id}`);
  return res.data;
};

export const createCategory = async (data: {
  name: string;
  imageUrl?: string;
}) => {
  const res = await api.post("/categories", data);
  return res.data;
};

export const updateCategory = async (
  id: string,
  data: { name?: string; imageUrl?: string }
) => {
  const res = await api.put(`/categories/${id}`, data);
  return res.data;
};

export const deleteCategory = async (id: string) => {
  const res = await api.delete(`/categories/${id}`);
  return res.data;
};





// Products API

export const fetchProducts = async () =>
  (await api.get("/products")).data;

export const fetchProductById = async (id: string) =>
  (await api.get(`/products/${id}`)).data;

export const fetchProductsByCategory = async (categoryId: string) =>
  (await api.get(`/categories/${categoryId}/products`)).data;

export const createProduct = async (data: {
  name: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  description?: string;
}) => (await api.post("/products", data)).data;

export const updateProduct = async (
  id: string,
  data: {
    name?: string;
    price?: number;
    categoryId?: string;
    imageUrl?: string;
    description?: string;
  }
) => (await api.put(`/products/${id}`, data)).data;

export const deleteProduct = async (id: string) =>
  (await api.delete(`/products/${id}`)).data;


