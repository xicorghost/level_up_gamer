import { createContext, useContext, useEffect, useState } from "react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductContextType {
  products: Product[];
  addProduct: (p: Product) => void;
  deleteProduct: (id: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const stored = localStorage.getItem("products");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (p: Product) => setProducts(prev => [...prev, p]);

  const deleteProduct = (id: number) =>
    setProducts(prev => prev.filter(p => p.id !== id));

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductProvider");
  return ctx;
};
