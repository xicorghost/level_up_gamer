import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../../components/Cart';

describe('CartPage Component', () => {

  const mockRemove = vi.fn();
  const mockCheckout = vi.fn();
  const mockGetPrice = vi.fn((price: number) => price);

  const mockCart = [
    {
      product: { name: 'Producto A', price: 1000 },
      quantity: 2,
    },
    {
      product: { name: 'Producto B', price: 2000 },
      quantity: 1,
    },
  ];

  test('Muestra "El carrito está vacío" cuando no hay productos', () => {
    render(
      <CartPage
        cart={[]}
        cartTotal={0}
        removeFromCart={mockRemove}
        checkout={mockCheckout}
        getPrice={mockGetPrice}
        currentUser={null}
      />
    );

    expect(screen.getByText('El carrito está vacío.')).toBeInTheDocument();
  });

  test('Renderiza todos los productos del carrito', () => {
    render(
      <CartPage
        cart={mockCart}
        cartTotal={3000}
        removeFromCart={mockRemove}
        checkout={mockCheckout}
        getPrice={mockGetPrice}
        currentUser={null}
      />
    );

    expect(screen.getByText('Producto A')).toBeInTheDocument();
    expect(screen.getByText('Producto B')).toBeInTheDocument();
  });

  test('Llama a removeFromCart al hacer clic en el botón X', () => {
    render(
      <CartPage
        cart={mockCart}
        cartTotal={3000}
        removeFromCart={mockRemove}
        checkout={mockCheckout}
        getPrice={mockGetPrice}
        currentUser={null}
      />
    );

    const deleteButtons = screen.getAllByText('X');
    fireEvent.click(deleteButtons[0]);

    expect(mockRemove).toHaveBeenCalledWith(0);
  });

  test('Ejecuta checkout al hacer clic en FINALIZAR COMPRA', () => {
    render(
      <CartPage
        cart={mockCart}
        cartTotal={3000}
        removeFromCart={mockRemove}
        checkout={mockCheckout}
        getPrice={mockGetPrice}
        currentUser={null}
      />
    );

    fireEvent.click(screen.getByText('FINALIZAR COMPRA'));
    expect(mockCheckout).toHaveBeenCalled();
  });

  test('Muestra el mensaje de descuento DUOC', () => {
    render(
      <CartPage
        cart={mockCart}
        cartTotal={3000}
        removeFromCart={mockRemove}
        checkout={mockCheckout}
        getPrice={mockGetPrice}
        currentUser={{ name: 'Juan', isDuoc: true }}
      />
    );

    expect(screen.getAllByText('(Desc. Duoc aplicado)').length).toBeGreaterThan(0);
  });
});
