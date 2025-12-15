//src/services/productApi.ts
import axios from "axios";
import type { Product } from "../types";

// Cambia si tu backend corre en otro puerto
const API_URL = "http://localhost:8080/api/productos";

// ✔ Obtener todos los productos
export const getProducts = async (): Promise<Product[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✔ Crear producto
export const createProduct = async (product: Product): Promise<Product> => {
  const response = await axios.post(API_URL, product);
  return response.data;
};

// ✔ Eliminar producto
export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

// ✔ Actualizar producto
export const updateProduct = async (id: number, product: Product): Promise<Product> => {
  const response = await axios.put(`${API_URL}/${id}`, product);
  return response.data;
};

// ✔ Obtener producto por ID
export const getProductById = async (id: number): Promise<Product> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
