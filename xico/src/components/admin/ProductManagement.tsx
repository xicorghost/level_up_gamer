import React, { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productApi";
import type { Product } from "../../types";
import styles from "../../styles/ProductManagement.module.css";

<<<<<<< HEAD
export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
=======
import React, { useState } from 'react';
import type { Product } from '../../types/index';
import { PRODUCTS, CATEGORIES } from '../../services/products.service';

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [showAddForm, setShowAddForm] = useState(false);
>>>>>>> c93ff2d886c5542de9ae18fd0f468c0a4382404f
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product>({
    code: "",
    category: "",
    name: "",
    price: 0,
    description: "",
    image: "",
    stock: 0,
  });

  // ============================
  // Cargar productos al iniciar
  // ============================
  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error cargando productos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ============================
  // Manejo de inputs
  // ============================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  // ============================
  // Guardar producto (crear / editar)
  // ============================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id!, formData);
      } else {
        await createProduct(formData);
      }

      setFormData({
        code: "",
        category: "",
        name: "",
        price: 0,
        description: "",
        image: "",
        stock: 0,
      });

      setEditingProduct(null);
      loadProducts();

    } catch (error) {
      console.error("Error guardando producto:", error);
    }
  };

  // ============================
  // Editar producto
  // ============================
  const startEditing = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
  };

  // ============================
  // Eliminar producto
  // ============================
  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestión de Productos</h2>

      {/* FORMULARIO */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <h3>{editingProduct ? "Editar Producto" : "Nuevo Producto"}</h3>

        <input name="code" placeholder="Código" value={formData.code} onChange={handleChange} required />
        <input name="category" placeholder="Categoría" value={formData.category} onChange={handleChange} required />
        <input name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} required />
        <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} required />
        <input name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} required />
        <input name="image" placeholder="URL Imagen" value={formData.image} onChange={handleChange} required />
        <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required />

        <button type="submit" className={styles.btnSave}>
          {editingProduct ? "Actualizar" : "Crear"}
        </button>
      </form>

      {/* TABLA */}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.code}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td><img src={p.image} className={styles.img} /></td>
              <td>
                <button className={styles.btnEdit} onClick={() => startEditing(p)}>Editar</button>
                <button className={styles.btnDelete} onClick={() => handleDelete(p.id!)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
