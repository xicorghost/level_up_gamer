// src/components/admin/ProductManagement.tsx

/*import React, { useState } from 'react';
import type { Product } from '../../types/index';
import { PRODUCTS, CATEGORIES } from '../../services/products.service';

export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product>({
    code: '',
    name: '',
    category: 'Accesorios',
    price: 0,
    description: '',
    image: '',
    stock: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      // Actualizar producto existente
      setProducts(
        products.map((p) =>
          p.code === editingProduct.code ? { ...p, ...formData } as Product : p
        )
      );
      alert('Producto actualizado correctamente');
    } else {
      // Agregar nuevo producto
      const newProduct: Product = {
        code: formData.code!,
        name: formData.name!,
        category: formData.category!,
        price: formData.price!,
        description: formData.description!,
        image: formData.image || 'https://via.placeholder.com/180x150/1a4d4d/00ff9f?text=Producto',
        stock: formData.stock || 0,
      };
      setProducts([...products, newProduct]);
      alert('Producto agregado correctamente');
    }

    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddForm(true);
  };

  const handleDelete = (code: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      setProducts(products.filter((p) => p.code !== code));
      alert('Producto eliminado correctamente');
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      category: 'Accesorios',
      price: 0,
      description: '',
      image: '',
      stock: 0,
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0a0a0a',
    border: '2px solid #00ff9f',
    color: '#00ff9f',
    fontFamily: 'monospace',
    fontSize: '18px',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#1a4d4d',
    color: '#00ff9f',
    border: '2px solid #00ff9f',
    padding: '12px 30px',
    fontFamily: 'monospace',
    fontSize: '22px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '10px',
  };

  return (
    <div>
      <div
        style={{
          backgroundColor: '#0f1f1f',
          border: '2px solid #00ff9f',
          padding: '30px',
          marginBottom: '30px',
        }}
      >
        <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>&gt; GESTIÓN DE PRODUCTOS</h3>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          style={buttonStyle}
        >
          {showAddForm ? 'CANCELAR' : '+ AGREGAR PRODUCTO'}
        </button>
      </div>

      {showAddForm && (
        <div
          style={{
            backgroundColor: '#0f1f1f',
            border: '2px solid #00ff9f',
            padding: '25px',
            marginBottom: '30px',
          }}
        >
          <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>
            &gt; {editingProduct ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}
          </h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>CÓDIGO:</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
                disabled={!!editingProduct}
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>NOMBRE:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>CATEGORÍA:</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                style={inputStyle}
              >
                {CATEGORIES.filter(c => c !== 'Todas').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>PRECIO:</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>STOCK:</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                required
                style={inputStyle}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>IMAGEN URL:</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                style={inputStyle}
                placeholder="https://..."
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>DESCRIPCIÓN:</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ ...buttonStyle, flex: 1 }}>
                {editingProduct ? 'ACTUALIZAR' : 'GUARDAR'} PRODUCTO
              </button>
              <button
                type="button"
                onClick={resetForm}
                style={{
                  ...buttonStyle,
                  flex: 1,
                  backgroundColor: '#ff0000',
                }}
              >
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista de productos }
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {products.map((product) => (
          <div
            key={product.code}
            style={{
              backgroundColor: '#0f1f1f',
              border: '2px solid #00ff9f',
              padding: '20px',
            }}
          >
            <div style={{ opacity: 0.7, marginBottom: '10px' }}>[{product.category}]</div>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                maxHeight: '150px',
                objectFit: 'contain',
                marginBottom: '15px',
                border: '1px solid #00ff9f',
                padding: '5px',
              }}
            />
            <h4 style={{ fontSize: '22px', marginBottom: '10px' }}>{product.name}</h4>
            <p style={{ fontSize: '16px', opacity: 0.8, marginBottom: '10px' }}>
              {product.description}
            </p>
            <div style={{ fontSize: '24px', marginBottom: '10px' }}>
              ${product.price.toLocaleString('es-CL')}
            </div>
            <div style={{ fontSize: '16px', marginBottom: '15px' }}>
              Stock: {product.stock} unidades
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleEdit(product)}
                style={{
                  ...buttonStyle,
                  flex: 1,
                  fontSize: '16px',
                  padding: '8px 15px',
                }}
              >
                EDITAR
              </button>
              <button
                onClick={() => handleDelete(product.code)}
                style={{
                  ...buttonStyle,
                  flex: 1,
                  fontSize: '16px',
                  padding: '8px 15px',
                  backgroundColor: '#ff0000',
                }}
              >
                ELIMINAR
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};*/
// src/components/admin/ProductManagement.tsx

import React, { useState, useEffect } from 'react';
import type { Product } from '../../types/index';
import { PRODUCTS, CATEGORIES } from '../../services/products.service';


export const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<Product>({
    code: '',
    name: '',
    category: 'Accesorios',
    price: 0,
    description: '',
    image: '',
    stock: 0,
  });

  // Cargar desde localStorage o desde PRODUCTS
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(PRODUCTS);
      localStorage.setItem("products", JSON.stringify(PRODUCTS));
    }
  }, []);

  const saveToLocalStorage = (list: Product[]) => {
    localStorage.setItem("products", JSON.stringify(list));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      // Actualizar producto existente
      const updatedList = products.map((p) =>
        p.code === editingProduct.code ? { ...p, ...formData } : p
      );
      setProducts(updatedList);
      saveToLocalStorage(updatedList);
      alert('Producto actualizado correctamente');

    } else {
      // Agregar nuevo producto
      const newProduct: Product = {
        ...formData,
        image: formData.image || 'https://via.placeholder.com/180x150/1a4d4d/00ff9f?text=Producto',
      };

      const newList = [...products, newProduct];
      setProducts(newList);
      saveToLocalStorage(newList);
      alert('Producto agregado correctamente');
    }

    resetForm();
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddForm(true);
  };

  const handleDelete = (code: string) => {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      const updatedList = products.filter((p) => p.code !== code);
      setProducts(updatedList);
      saveToLocalStorage(updatedList);
      alert('Producto eliminado correctamente');
    }
  };

  const resetForm = () => {
    setFormData({
      code: '',
      name: '',
      category: 'Accesorios',
      price: 0,
      description: '',
      image: '',
      stock: 0,
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0a0a0a',
    border: '2px solid #00ff9f',
    color: '#00ff9f',
    fontFamily: 'monospace',
    fontSize: '18px',
  };

  const buttonStyle: React.CSSProperties = {
    backgroundColor: '#1a4d4d',
    color: '#00ff9f',
    border: '2px solid #00ff9f',
    padding: '12px 30px',
    fontFamily: 'monospace',
    fontSize: '22px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    marginTop: '10px',
  };

  return (
    <div>

      <div style={{
        backgroundColor: '#0f1f1f',
        border: '2px solid #00ff9f',
        padding: '30px',
        marginBottom: '30px'
      }}>
        <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>&gt; GESTIÓN DE PRODUCTOS</h3>
        <button onClick={() => setShowAddForm(!showAddForm)} style={buttonStyle}>
          {showAddForm ? 'CANCELAR' : '+ AGREGAR PRODUCTO'}
        </button>
      </div>

      {showAddForm && (
        <div style={{
          backgroundColor: '#0f1f1f',
          border: '2px solid #00ff9f',
          padding: '25px',
          marginBottom: '30px',
        }}>
          <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>
            &gt; {editingProduct ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Código */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>CÓDIGO:</label>
              <input
                type="text"
                required
                disabled={!!editingProduct}
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Nombre */}
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>NOMBRE:</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Categoría */}
            <div style={{ marginBottom: '15px' }}>
              <label>CATEGORÍA:</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={inputStyle}
              >
                {CATEGORIES.filter(c => c !== "Todas").map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Precio */}
            <div style={{ marginBottom: '15px' }}>
              <label>PRECIO:</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                style={inputStyle}
              />
            </div>

            {/* Stock */}
            <div style={{ marginBottom: '15px' }}>
              <label>STOCK:</label>
              <input
                type="number"
                required
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                style={inputStyle}
              />
            </div>

            {/* Imagen */}
            <div style={{ marginBottom: '15px' }}>
              <label>IMAGEN URL:</label>
              <input
                type="text"
                placeholder="https://..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                style={inputStyle}
              />
            </div>

            {/* Descripción */}
            <div style={{ marginBottom: '15px' }}>
              <label>DESCRIPCIÓN:</label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ ...buttonStyle, flex: 1 }}>
                {editingProduct ? "ACTUALIZAR" : "GUARDAR"} PRODUCTO
              </button>

              <button
                type="button"
                onClick={resetForm}
                style={{ ...buttonStyle, flex: 1, backgroundColor: "#ff0000" }}
              >
                CANCELAR
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LISTADO */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
        }}
      >
        {products.map(product => (
          <div key={product.code} style={{
            backgroundColor: '#0f1f1f',
            border: '2px solid #00ff9f',
            padding: '20px'
          }}>
            <div style={{ opacity: 0.7, marginBottom: '10px' }}>
              [{product.category}]
            </div>

            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                maxHeight: '150px',
                objectFit: 'contain',
                marginBottom: '15px',
                border: '1px solid #00ff9f',
                padding: '5px',
              }}
            />

            <h4 style={{ fontSize: '22px', marginBottom: '10px' }}>
              {product.name}
            </h4>

            <p style={{ fontSize: '16px', opacity: 0.8, marginBottom: '10px' }}>
              {product.description}
            </p>

            <div style={{ fontSize: '24px', marginBottom: '10px' }}>
              ${product.price.toLocaleString("es-CL")}
            </div>

            <div style={{ fontSize: '16px', marginBottom: '15px' }}>
              Stock: {product.stock} unidades
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleEdit(product)}
                style={{ ...buttonStyle, flex: 1 }}
              >
                EDITAR
              </button>

              <button
                onClick={() => handleDelete(product.code)}
                style={{
                  ...buttonStyle,
                  flex: 1,
                  backgroundColor: '#ff0000'
                }}
              >
                ELIMINAR
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
