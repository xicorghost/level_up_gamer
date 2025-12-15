// src/pages/Home.tsx

<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import type { 
    Section, 
    Product, 
    CheckoutData, 
    CompraRequestDTO, 
    BoletaResult 
} from '../types';

=======
import React, { useState } from 'react';
//import type { Section, Product, Order } from '../types';
import type { Section, Product, CartItem } from '../types/index';
>>>>>>> c93ff2d886c5542de9ae18fd0f468c0a4382404f
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { CustomAlert } from '../components/CustomAlert';
import { ReviewModal } from '../components/ReviewModal';

// Componentes del flujo de compra
import { CheckoutForm } from '../components/CheckoutForm';
import { PurchaseResult } from '../components/PurchaseResult';


import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useReviews } from '../hooks/useReviews';
import { productService, CATEGORIES } from '../services/products.service';
import { ADMIN_CREDENTIALS } from '../types';

/* -------------------- CONFIG & STYLES -------------------- */

// 🛑 URL BASE DE TU API DE SPRING BOOT
const API_BASE_URL = 'http://localhost:8080/api'; 

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: '#0f1f1f',
  border: '2px solid #00ff9f',
  padding: '25px',
  boxShadow: '0 0 20px rgba(0,255,159,.25)',
};

const titleStyle: React.CSSProperties = {
  color: '#00ff9f',
  textShadow: '0 0 10px #00ff9f',
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  background: '#0a0a0a',
  border: '2px solid #00ff9f',
  color: '#00ff9f',
  fontFamily: 'monospace',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  marginTop: '10px',
  padding: '12px',
  background: '#1a4d4d',
  border: '2px solid #00ff9f',
  color: '#00ff9f',
  fontFamily: 'monospace',
  cursor: 'pointer',
};

/* -------------------- COMPONENT -------------------- */

export const Home: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [alert, setAlert] = useState<{ title: string; message: string } | null>(null);

  const [highlighted, setHighlighted] = useState<string | null>(null);

  const { currentUser, login, register, logout, updateUser } = useAuth();
  const { cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart();
  const { addReview, getAverageRating, getProductReviews, hasUserReviewed } = useReviews();

  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewProduct, setReviewProduct] = useState<Product | null>(null);

  // 🛑 NUEVOS ESTADOS PARA CHECKOUT Y RESULTADO DE COMPRA
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);
  const [purchaseResult, setPurchaseResult] = useState<BoletaResult | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const isAdmin = currentUser?.email === ADMIN_CREDENTIALS.email;

  /* -------------------- LOAD PRODUCTS -------------------- */

  useEffect(() => {
    const load = async () => {
      const saved = localStorage.getItem('products');
      if (saved) {
        setProducts(JSON.parse(saved));
      } else {
        const p = productService.getAllProducts();
        setProducts(p);
        localStorage.setItem('products', JSON.stringify(p));
      }
    };
    load();
  }, []);

  /* -------------------- AUTH -------------------- */

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await login(
      fd.get('email') as string,
      fd.get('password') as string
    );

    setAlert({
      title: res.success ? 'LOGIN OK' : 'ERROR',
      message: res.message,
    });
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await register(
      fd.get('name') as string,
      fd.get('email') as string,
      fd.get('password') as string,
      Number(fd.get('age'))
    );

    setAlert({
      title: res.success ? 'REGISTRO OK' : 'ERROR',
      message: res.message,
    });
  };

  /* -------------------- CART & CHECKOUT FLOW -------------------- */

  const handleAdd = (product: Product) => {
    if (!currentUser) {
      setAlert({ title: 'ATENCIÓN', message: 'Debes iniciar sesión' });
      return;
    }

    addToCart(product);
    setHighlighted(product.code);
    setTimeout(() => setHighlighted(null), 300);
  };

  // 🛑 FUNCIÓN PARA REDIRIGIR AL FORMULARIO DE CHECKOUT
  const handleCheckoutRedirect = () => {
    if (!currentUser || cart.length === 0) {
      setAlert({ title: 'ATENCIÓN', message: 'Debes iniciar sesión y tener productos en el carrito.' });
      return;
    }
    
    // Pre-llenar datos con información del usuario
    const initialData: CheckoutData = {
      nombre: currentUser.nombre,
      apellido: currentUser.apellido || 'N/A', // Usar el apellido si existe, sino 'N/A'
      correo: currentUser.email,
      calle: currentUser.calle || '', 
      region: currentUser.region || 'Región Metropolitana de Santiago', 
      comuna: currentUser.comuna || 'Cerrillos', 
      departamento: currentUser.departamento || '',
      indicaciones: '',
    };

    setCheckoutData(initialData); 
    setCurrentSection('checkout'); // Navega a la vista de Checkout
  };


  // 🛑 FUNCIÓN PARA ENVIAR LA COMPRA AL BACKEND
  const submitPurchase = async (shippingData: CheckoutData) => {
    if (!currentUser) return;

    // 1. Mapeo de CartItem a DTO
    const purchaseItems = cart.map(item => ({
      productId: item.product.id!, 
      quantity: item.quantity,
      price: item.product.price, // Precio base (el descuento se maneja en el total/descuento)
    }));

    // 2. Cálculo de Totales
    const totalWithDiscount = getCartTotal(currentUser);
    const totalOriginal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discountAmount = totalOriginal - totalWithDiscount;
    
    // 3. Creación del DTO final para Spring Boot
    const purchaseDTO: CompraRequestDTO = {
      ...shippingData,
      userEmail: currentUser.email,
      subtotal: totalOriginal, // Subtotal antes de descuento
      descuento: discountAmount, // Cantidad de descuento aplicada
      total: totalWithDiscount, // Total final a pagar
      items: purchaseItems,
    };
    
    try {
        // 4. Envío de la compra a la API
        const res = await axios.post(`${API_BASE_URL}/compras`, purchaseDTO);
        
        // 5. Procesar Respuesta Exitosa (asume que res.data es BoletaResult)
        const result: BoletaResult = res.data; 

        // Actualizar estado local del usuario (puntos, productos comprados)
        const pointsEarned = Math.floor(result.total / 1000);
        const newProductCodes = cart.map(item => item.product.code);

        const updatedUser = {
          ...currentUser,
          puntos: (currentUser.puntos ?? 0) + pointsEarned,
          purchasedProducts: [
              ...(currentUser.purchasedProducts || []), 
              ...newProductCodes
          ],
        };
        
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        updateUser(updatedUser); // Sincroniza el estado
        clearCart();

        setPurchaseResult(result);
        setIsSuccess(true);
        setCurrentSection('result'); // Ir a la vista de éxito

    } catch (error: any) {
        console.error('Error al procesar la compra:', error);
        
        // 6. Procesar Fallo
        // Crear un resultado simple para mostrar el fallo
        const failedResult: BoletaResult = {
          id: 'FALLO',
          fecha: new Date().toISOString(),
          usuarioEmail: currentUser.email,
          total: totalWithDiscount,
          subtotal: totalOriginal,
          descuento: discountAmount,
          estado: 'FALLIDO',
          nombreCompleto: `${shippingData.nombre} ${shippingData.apellido}`,
          direccionEntrega: `${shippingData.calle}, ${shippingData.comuna}`,
          detalles: purchaseItems.map(i => ({ 
            productoNombre: cart.find(c => c.product.id === i.productId)?.product.name || 'Producto Desconocido',
            cantidad: i.quantity,
            precioUnitario: i.price
          })),
        };

        setPurchaseResult(failedResult);
        setIsSuccess(false);
        setCurrentSection('result'); // Ir a la vista de fallo
    }
  };

  /* -------------------- FILTER -------------------- */

  const filteredProducts = products.filter(p => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  /* -------------------- RENDER -------------------- */

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'repeating-conic-gradient(#0a0a0a 0% 25%, #0f1f1f 0% 50%) 0 0 / 30px 30px',
        color: '#00ff9f',
        fontFamily: 'monospace',
      }}
    >
      <Header
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        cartCount={getCartCount()}
      />

      {/* ADMIN */}
      {isAdmin && (
        <div style={{ textAlign: 'center', padding: '10px' }}>
          <button
            onClick={() => (window.location.href = '/admin')}
            style={{ ...buttonStyle, width: 'auto' }}
          >
            🔐 ADMIN DASHBOARD
          </button>
        </div>
      )}

      <div style={containerStyle}>

        {/* HOME (Login/Registro) */}
        {currentSection === 'home' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {!currentUser ? (
              <>
                <div style={sectionStyle}>
                  <h3 style={titleStyle}>LOGIN</h3>
                  <form onSubmit={handleLogin}>
                    <input name="email" placeholder="Email" style={inputStyle} />
                    <input name="password" type="password" placeholder="Password" style={inputStyle} />
                    <button style={buttonStyle}>Entrar</button>
                  </form>
                </div>

                <div style={sectionStyle}>
                  <h3 style={titleStyle}>REGISTRO</h3>
                  <form onSubmit={handleRegister}>
                    <input name="name" placeholder="Nombre" style={inputStyle} />
                    <input name="email" placeholder="Email" style={inputStyle} />
                    <input name="password" type="password" placeholder="Password" style={inputStyle} />
                    <input name="age" type="number" placeholder="Edad" style={inputStyle} />
                    <button style={buttonStyle}>Registrarse</button>
                  </form>
                </div>
              </>
            ) : (
              <div style={sectionStyle}>
                <h3 style={titleStyle}>BIENVENIDO {currentUser.nombre}</h3>
                <p>Puntos: {currentUser.puntos ?? 0}</p>
                <button onClick={logout} style={buttonStyle}>Cerrar sesión</button>
              </div>
            )}
          </div>
        )}

        {/* PRODUCTS */}
        {currentSection === 'products' && (
          <>
            <div style={sectionStyle}>
              <select onChange={e => setCategoryFilter(e.target.value)} style={inputStyle}>
                <option value="all">Todas</option>
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <input
                placeholder="Buscar..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, 280px)', gap: '20px' }}>
              {filteredProducts.map(p => (
                <div
                  key={p.code}
                  style={{
                    boxShadow: highlighted === p.code ? '0 0 25px #00ff9f' : 'none',
                    transition: '0.3s',
                  }}
                >
                  <ProductCard
                    product={p}
                    price={p.price}
                    ratingData={getAverageRating(p.code)}
                    isDuocUser={!!currentUser?.duoc}
                    onAddToCart={() => handleAdd(p)}
                    onViewReviews={() => {
                      setReviewProduct(p);
                      setReviewOpen(true);
                    }}
                  />
                </div>
              ))}
              </div>
          </>
        )}

        {/* CART */}
        {currentSection === 'cart' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            <div style={sectionStyle}>
              {cart.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item.product.name} ({item.quantity})</span>
                  <button onClick={() => removeFromCart(i)}>❌</button>
                </div>
              ))}
            </div>

            <div style={sectionStyle}>
              <h3>TOTAL</h3>
              <p>${getCartTotal(currentUser!).toLocaleString('es-CL')}</p>
              {/* 🛑 CAMBIADO: Redirige al formulario de dirección */}
              <button style={buttonStyle} onClick={handleCheckoutRedirect}>FINALIZAR COMPRA</button>
            </div>
          </div>
        )}
        
        {/* 🛑 NUEVA SECCIÓN: CHECKOUT (FORMULARIO DE DIRECCIÓN) */}
        {currentSection === 'checkout' && currentUser && checkoutData && (
          <CheckoutForm 
            initialData={checkoutData}
            cart={cart}
            total={getCartTotal(currentUser)}
            onSubmit={submitPurchase} // Envía los datos al backend
          />
        )}
        
        {/* 🛑 NUEVA SECCIÓN: RESULTADO (ÉXITO/FALLO) */}
        {currentSection === 'result' && purchaseResult && (
          <PurchaseResult 
            purchase={purchaseResult} 
            isSuccess={isSuccess!} 
            onRetry={() => setCurrentSection('checkout')} 
            onGoHome={() => setCurrentSection('home')} 
          />
        )}


        {/* PROFILE */}
        {currentSection === 'profile' && (
        <div style={sectionStyle}>
          {currentUser ? (
            <>
              <p><strong>NOMBRE:</strong> {currentUser.nombre}</p>
              <p><strong>EMAIL:</strong> {currentUser.email}</p>
              <p><strong>PUNTOS:</strong> {currentUser.puntos}</p>
              <p><strong>NIVEL:</strong> {currentUser.nivel}</p>
              <p><strong>CÓDIGO REFERIDO:</strong> {currentUser.codigoReferido}</p>

              {currentUser.duoc && (
                <span
                  style={{
                    backgroundColor: '#00ff9f',
                    color: '#0a0a0a',
                    padding: '5px 15px',
                    display: 'inline-block',
                    marginTop: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  DESCUENTO DUOC ACTIVO
                </span>
              )}
            </>
          ) : (
            <p>Debes iniciar sesión para ver tu perfil.</p>
          )}
        </div>
      )}

        {/* COMMUNITY */}
        {currentSection === 'community' && (
          <div style={sectionStyle}>
          <h3>&gt; COMUNIDAD GAMER</h3>
          {currentUser ? (
            <p>
              TU CÓDIGO DE REFERIDO:{' '}
              <span style={{ textShadow: '0 0 10px #00ff9f' }}>
                {currentUser.codigoReferido}
              </span>
            </p>
          ) : (
            <p>Inicia sesión para ver tu código de referido.</p>
          )}
        </div>
      )}

      </div>

      {reviewProduct && (
        <ReviewModal
          isOpen={reviewOpen}
          product={reviewProduct}
          currentUser={currentUser}
          reviews={getProductReviews(reviewProduct.code)}
          ratingData={getAverageRating(reviewProduct.code)}
          hasUserReviewed={
            !!currentUser && hasUserReviewed(reviewProduct.code, currentUser.email)
          }
          purchasedProducts={currentUser?.purchasedProducts ?? []} 
          onClose={() => setReviewOpen(false)}
          onSubmitReview={(r, t) =>
            addReview(reviewProduct.code, {
              rating: r,
              text: t,
              userName: currentUser!.nombre,
              userEmail: currentUser!.email,
              date: new Date().toLocaleDateString(),
            })
          }
        />
      )}

      <CustomAlert alertData={alert} onClose={() => setAlert(null)} />
      <Footer />
    </div>
  );
};