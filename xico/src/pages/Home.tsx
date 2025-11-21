// src/pages/Home.tsx

import React, { useState } from 'react';
//import type { Section, Product, Order } from '../types';
import type { Section, Product, CartItem } from '../types/index';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import { CustomAlert } from '../components/CustomAlert';
import { ReviewModal } from '../components/ReviewModal';
import { useAuth } from '../hooks/useAuth';
import { useCart } from '../hooks/useCart';
import { useReviews } from '../hooks/useReviews';
import { productService, CATEGORIES } from '../services/products.service';

const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '20px',
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: '#0f1f1f',
  border: '2px solid #00ff9f',
  padding: '30px',
  marginBottom: '30px',
  boxShadow: '0 0 20px rgba(0, 255, 159, 0.3)',
};

const titleStyle: React.CSSProperties = {
  color: '#00ff9f',
  fontSize: '36px',
  marginBottom: '20px',
  textShadow: '0 0 10px #00ff9f',
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
  width: '100%',
  marginTop: '10px',
  transition: 'all 0.3s',
};

const formGroupStyle: React.CSSProperties = {
  marginBottom: '15px',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#00ff9f',
  marginBottom: '5px',
  fontSize: '20px',
};

export const Home: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');
  const [purchasedProducts, setPurchasedProducts] = useState<string[]>([]);
  const [alertData, setAlertData] = useState<{ title: string; message: string } | null>(null);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [currentReviewProduct, setCurrentReviewProduct] = useState<Product | null>(null);

  const { currentUser, register, login, logout, updateUser } = useAuth();
  const { cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCount } = useCart();
  const { addReview, getAverageRating, hasUserReviewed, getProductReviews } = useReviews();

  const showAlert = (title: string, message: string) => {
    setAlertData({ title, message });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = register(
      formData.get('name') as string,
      formData.get('email') as string,
      parseInt(formData.get('age') as string),
      formData.get('referral') as string
    );

    if (result.success) {
      showAlert('¡REGISTRO EXITOSO!', result.message);
    } else {
      showAlert('ERROR DE REGISTRO', result.message);
    }
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = login(formData.get('email') as string);

    if (result.success) {
      setPurchasedProducts(['LL001', 'JM002', 'AC001', 'AC002', 'CO001', 'CG001']);
      showAlert('¡SESIÓN INICIADA!', result.message);
    }
  };

  const handleAddToCart = (productCode: string) => {
    if (!currentUser) {
      showAlert('SESIÓN REQUERIDA', 'Debes iniciar sesión para agregar productos al carrito.');
      setCurrentSection('home');
      return;
    }

    const product = productService.getProductByCode(productCode);
    if (product) {
      addToCart(product);
      showAlert('¡PRODUCTO AGREGADO!', `${product.name}\n\nha sido agregado al carrito.`);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showAlert('CARRITO VACÍO', 'El carrito está vacío.');
      return;
    }

    const total = getCartTotal(currentUser);
    //const newPurchases = cart.map(item => item.code).filter(code => !purchasedProducts.includes(code));
    const newPurchases = cart
      .map(item => item.product.code)
      .filter(code => !purchasedProducts.includes(code));

    setPurchasedProducts([...purchasedProducts, ...newPurchases]);

    if (currentUser) {
      const earnedPoints = Math.floor(total / 1000);
      updateUser({
        points: currentUser.points + earnedPoints,
        level: Math.floor((currentUser.points + earnedPoints) / 500) + 1,
      });
    }

    showAlert(
      '¡COMPRA REALIZADA!',
      `¡Compra realizada con éxito!\nTotal: $${total.toLocaleString('es-CL')}\nHas ganado ${Math.floor(total / 1000)} puntos LevelUp!\n\n¡Ahora puedes dejar reseñas de los productos comprados!`
    );
    clearCart();
  };

  const handleOpenReviewModal = (productCode: string) => {
    const product = productService.getProductByCode(productCode);
    if (product) {
      setCurrentReviewProduct(product);
      setReviewModalOpen(true);
    }
  };

  const handleSubmitReview = (rating: number, text: string) => {
    if (!currentUser || !currentReviewProduct) return;

    const newReview = {
      userName: currentUser.name,
      userEmail: currentUser.email,
      rating,
      text,
      date: new Date().toLocaleDateString('es-CL'),
    };

    addReview(currentReviewProduct.code, newReview);
    updateUser({ points: currentUser.points + 50 });

    showAlert(
      '¡RESEÑA PUBLICADA!',
      '¡Reseña publicada con éxito!\n\nHas ganado 50 puntos LevelUp.\n¡Gracias por compartir tu opinión!'
    );
    setReviewModalOpen(false);
  };

  const getPrice = (price: number) => {
    return currentUser?.isDuoc ? price * 0.8 : price;
  };

  const filteredProducts = productService.filterProducts(categoryFilter, searchFilter);

  return (
    <div
      style={{
        background: 'repeating-conic-gradient(#0a0a0a 0% 25%, #0f1f1f 0% 50%) 0 0 / 30px 30px',
        minHeight: '100vh',
        color: '#00ff9f',
        fontFamily: 'monospace',
      }}
    >
      <Header
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        cartCount={getCartCount()}
      />

      {/* Admin Access Button */}
      <div style={{ textAlign: 'center', padding: '10px', backgroundColor: '#0a0a0a', borderBottom: '2px solid #00ff9f' }}>
        <button
          onClick={() => window.location.href = '/admin'}
          style={{
            backgroundColor: 'transparent',
            color: '#00ff9f',
            border: '2px solid #00ff9f',
            padding: '8px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            fontFamily: 'monospace',
            transition: 'all 0.3s',
          }}
        >
          🔐 ACCESO ADMINISTRADOR
        </button>
      </div>

      <div style={containerStyle}>
        {/* HOME SECTION */}
        {currentSection === 'home' && (
          <div>
            <div style={sectionStyle}>
              <h2 style={titleStyle}>¡Bienvenido a Level-Up Gamer!</h2>
              <p>Tu tienda online dedicada a satisfacer las necesidades de los entusiastas de los videojuegos en Chile.</p>
              <p>¡Desafía tus límites con Level-Up Gamer! Conviértete en el héroe de tu propia historia.</p>
            </div>

            {!currentUser ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Register Form */}
                <div style={{ backgroundColor: '#0f1f1f', border: '2px solid #00ff9f', padding: '25px' }}>
                  <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>&gt; REGISTRO</h3>
                  <form onSubmit={handleRegister}>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>NOMBRE:</label>
                      <input name="name" required style={inputStyle} />
                    </div>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>EMAIL:</label>
                      <input name="email" type="email" required style={inputStyle} />
                    </div>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>EDAD:</label>
                      <input name="age" type="number" min="18" required style={inputStyle} />
                    </div>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>CONTRASEÑA:</label>
                      <input name="password" type="password" required style={inputStyle} />
                    </div>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>CÓDIGO DE REFERIDO (Opcional):</label>
                      <input name="referral" style={inputStyle} />
                    </div>
                    <button type="submit" style={buttonStyle}>REGISTRARSE</button>
                  </form>
                </div>

                {/* Login Form */}
                <div style={{ backgroundColor: '#0f1f1f', border: '2px solid #00ff9f', padding: '25px' }}>
                  <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>&gt; INICIAR SESIÓN</h3>
                  <form onSubmit={handleLogin}>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>EMAIL:</label>
                      <input name="email" type="email" required style={inputStyle} />
                    </div>
                    <div style={formGroupStyle}>
                      <label style={labelStyle}>CONTRASEÑA:</label>
                      <input name="password" type="password" required style={inputStyle} />
                    </div>
                    <button type="submit" style={buttonStyle}>ENTRAR</button>
                  </form>
                </div>
              </div>
            ) : (
              <div style={sectionStyle}>
                <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>&gt; SESIÓN ACTIVA</h3>
                <p>USUARIO: {currentUser.name}</p>
                <p>EMAIL: {currentUser.email}</p>
                {currentUser.isDuoc && (
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
                    ¡DESCUENTO DUOC 20% ACTIVO!
                  </span>
                )}
                <div style={{ fontSize: '24px', marginTop: '15px' }}>
                  <p>PUNTOS LEVELUP: {currentUser.points}</p>
                  <p>NIVEL: {currentUser.level}</p>
                </div>
                <button onClick={logout} style={buttonStyle}>CERRAR SESIÓN</button>
              </div>
            )}
          </div>
        )}

        {/* PRODUCTS SECTION */}
        {currentSection === 'products' && (
          <div>
            <div style={sectionStyle}>
              <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>&gt; FILTROS</h3>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'center' }}>
                <div>
                  <label style={{ marginRight: '10px' }}>CATEGORÍA:</label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={inputStyle}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat === 'Todas' ? 'all' : cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ marginRight: '10px' }}>BUSCAR:</label>
                  <input
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Nombre del producto..."
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '25px',
              }}
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.code}
                  product={product}
                  price={getPrice(product.price)}
                  isDuocUser={currentUser?.isDuoc || false}
                  ratingData={getAverageRating(product.code)}
                  onAddToCart={handleAddToCart}
                  onViewReviews={handleOpenReviewModal}
                />
              ))}
            </div>
          </div>
        )}

        {/* CART SECTION */}
        {currentSection === 'cart' && (
          <div style={sectionStyle}>
            <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>&gt; CARRITO DE COMPRAS</h3>

            {cart.length === 0 ? (
              <p>El carrito está vacío.</p>
            ) : (
              <>
                {cart.map((item, index) => {
                  const price = getPrice(item.product.price);
                  return (
                    <div
                      key={index}
                      style={{
                        borderBottom: '1px solid #00ff9f',
                        padding: '15px 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <strong>{item.product.name}</strong>
                        <br />
                        ${price.toLocaleString('es-CL')} x {item.quantity}
                      </div>

                      <button
                        onClick={() => removeFromCart(index)}
                        style={{
                          backgroundColor: '#ff0000',
                          color: '#fff',
                          border: 'none',
                          padding: '5px 10px',
                          cursor: 'pointer',
                          fontFamily: 'monospace',
                        }}
                      >
                        X
                      </button>
                    </div>
                  );
                })}

                <div
                  style={{
                    fontSize: '32px',
                    marginTop: '20px',
                    paddingTop: '20px',
                    borderTop: '2px solid #00ff9f',
                    textShadow: '0 0 10px #00ff9f',
                  }}
                >
                  TOTAL: ${getCartTotal(currentUser).toLocaleString('es-CL')}
                </div>

                <button onClick={handleCheckout} style={buttonStyle}>
                  FINALIZAR COMPRA
                </button>
              </>
            )}
          </div>
        )}

        {/* PROFILE SECTION */}
        {currentSection === 'profile' && (
          <div style={sectionStyle}>
            <h3 style={{ fontSize: '28px', marginBottom: '20px' }}>&gt; MI PERFIL</h3>
            {currentUser ? (
              <>
                <p><strong>NOMBRE:</strong> {currentUser.name}</p>
                <p><strong>EMAIL:</strong> {currentUser.email}</p>
                <p><strong>PUNTOS LEVELUP:</strong> {currentUser.points}</p>
                <p><strong>NIVEL:</strong> {currentUser.level}</p>
                <p><strong>CÓDIGO DE REFERIDO:</strong> {currentUser.referralCode}</p>
                <p><strong>PRODUCTOS COMPRADOS:</strong> {purchasedProducts.length}</p>
                {currentUser.isDuoc && (
                  <span
                    style={{
                      backgroundColor: '#00ff9f',
                      color: '#0a0a0a',
                      padding: '5px 15px',
                      display: 'inline-block',
                      marginTop: '10px',
                    }}
                  >
                    DESCUENTO DUOC 20% ACTIVO
                  </span>
                )}
              </>
            ) : (
              <p>Debes iniciar sesión para ver tu perfil.</p>
            )}
          </div>
        )}

        {/* COMMUNITY SECTION */}
        {currentSection === 'community' && (
          <div>
            <div style={sectionStyle}>
              <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>&gt; COMUNIDAD GAMER</h3>
              <p>¡Únete a nuestra comunidad! Comparte tu código de referido y gana puntos LevelUp.</p>
              <div style={{ fontSize: '24px', marginTop: '15px' }}>
                <p>
                  TU CÓDIGO DE REFERIDO:{' '}
                  <span style={{ color: '#00ff9f', textShadow: '0 0 10px #00ff9f' }}>
                    {currentUser ? currentUser.referralCode : 'Debes iniciar sesión'}
                  </span>
                </p>
              </div>
            </div>

            <div style={sectionStyle}>
              <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>&gt; EVENTOS GAMER</h3>
              <p>Próximamente: Mapa interactivo con eventos de videojuegos a nivel nacional.</p>
            </div>

            <div style={sectionStyle}>
              <h3 style={{ fontSize: '28px', marginBottom: '15px' }}>&gt; BLOG Y NOTICIAS</h3>
              <p>Mantente al día con las últimas novedades del mundo gamer.</p>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewModalOpen}
        product={currentReviewProduct}
        currentUser={currentUser}
        purchasedProducts={purchasedProducts}
        reviews={currentReviewProduct ? getProductReviews(currentReviewProduct.code) : []}
        ratingData={currentReviewProduct ? getAverageRating(currentReviewProduct.code) : { average: '0', count: 0 }}
        hasUserReviewed={
          currentUser && currentReviewProduct
            ? hasUserReviewed(currentReviewProduct.code, currentUser.email)
            : false
        }
        onClose={() => setReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
      />

      {/* Custom Alert */}
      <CustomAlert alertData={alertData} onClose={() => setAlertData(null)} />

      {/* WhatsApp Button */}
      <button
        onClick={() =>
          window.open(
            'https://wa.me/56912345678?text=Hola,%20necesito%20soporte%20técnico',
            '_blank'
          )
        }
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: '#25D366',
          color: 'white',
          border: '2px solid #00ff9f',
          padding: '15px 25px',
          borderRadius: '50px',
          cursor: 'pointer',
          fontSize: '20px',
          boxShadow: '0 0 20px rgba(37, 211, 102, 0.5)',
          zIndex: 1000,
          fontFamily: 'monospace',
        }}
      >
        💬 SOPORTE TÉCNICO
      </button>

      <Footer />
    </div>
  );
};