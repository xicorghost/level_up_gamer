import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OrderManagement } from '../../../components/admin/OrderManagement';

describe('OrderManagement Component', () => {
  const renderComponent = () => render(<OrderManagement />);

  beforeEach(() => {
    renderComponent();
  });

  it('Renderiza la tabla y pedidos iniciales', () => {
    // Debe mostrar IDs de los pedidos mock
    expect(screen.getByText('#20240001')).toBeInTheDocument();
    expect(screen.getByText('#20240002')).toBeInTheDocument();
  });

  it('Filtra correctamente pedidos por estado', () => {
    // Click en filtro PENDIENTES
    fireEvent.click(screen.getByText(/PENDIENTES/i));

    // Solo deben quedar los que tienen status pending
    expect(screen.getByText('#20240002')).toBeInTheDocument();
    expect(screen.getByText('#20240004')).toBeInTheDocument();

    // No deberían aparecer pedidos completados
    expect(screen.queryByText('#20240001')).not.toBeInTheDocument();
  });

  it('Muestra mensaje cuando no hay pedidos con ese filtro', () => {
    fireEvent.click(screen.getByText(/CANCELADOS/i));

    expect(
      screen.getByText(/No hay pedidos con ese estado/i)
    ).toBeInTheDocument();
  });

  it('Abre el modal al presionar VER', () => {
    fireEvent.click(screen.getAllByText('VER')[0]);

    expect(
      screen.getByText(/DETALLE DEL PEDIDO/i)
    ).toBeInTheDocument();
  });

  it('Cierra el modal al presionar la X', () => {
    fireEvent.click(screen.getAllByText('VER')[0]);

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(
      screen.queryByText(/DETALLE DEL PEDIDO/i)
    ).not.toBeInTheDocument();
  });

  it('Cambia estado de PENDIENTE → COMPLETADO', () => {
    // Filtrar pendientes
    fireEvent.click(screen.getByText(/PENDIENTES/i));

    // Click en "COMPLETAR" del primer pedido pendiente
    fireEvent.click(screen.getAllByText(/COMPLETAR/i)[0]);

    // El botón COMPLETAR ya no debería existir para ese registro
    expect(
      screen.queryByText(/COMPLETAR/i)
    ).not.toBeInTheDocument();
  });

  it('Cambia estado de PENDIENTE → CANCELADO', () => {
    fireEvent.click(screen.getByText(/PENDIENTES/i));

    fireEvent.click(screen.getAllByText(/CANCELAR/i)[0]);

    expect(
      screen.queryByText(/CANCELAR/i)
    ).not.toBeInTheDocument();
  });
});
