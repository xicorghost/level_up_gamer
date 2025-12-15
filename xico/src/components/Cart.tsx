// src/components/Cart.tsx

import type { CartItem, UserData } from '../types/index';
//import { buttonStyle, sectionContainerStyle } from '../style/appStyle';
import { buttonStyle, sectionContainerStyle } from '../styles/appStyles';


interface CartPageProps {
  cart: CartItem[];
  cartTotal: number;
  removeFromCart: (index: number) => void;
  checkout: () => void;
  getPrice: (price: number) => number;
  currentUser: UserData | null;
}

export default function CartPage({
  cart,
  cartTotal,
  removeFromCart,
  checkout,
  getPrice,
  currentUser
}: CartPageProps) {
  return (
    <div style={sectionContainerStyle}>
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
                  alignItems: 'center'
                }}
              >
                <div>
                  <strong>{item.product.name}</strong><br />
                  ${price.toLocaleString('es-CL')} x {item.quantity}
                  {currentUser?.duoc && (
                    <span style={{ fontSize: '12px', marginLeft: '10px' }}>
                      (Desc. Duoc aplicado)
                    </span>
                  )}
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  style={{
                    backgroundColor: '#ff0000',
                    color: '#fff',
                    border: 'none',
                    padding: '5px 10px',
                    cursor: 'pointer',
                    fontFamily: 'monospace'
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
              textShadow: '0 0 10px #00ff9f'
            }}
          >
            TOTAL: ${cartTotal.toLocaleString('es-CL')}
          </div>

          <button onClick={checkout} style={buttonStyle}>
            FINALIZAR COMPRA
          </button>
        </>
      )}
    </div>
  );
}
