// src/tests/components/admin/AdminLogin.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { AdminLogin } from "../../../components/admin/AdminLogin";
import { ADMIN_CREDENTIALS } from '../../../types/index';

//import { ADMIN_CREDENTIALS } from "../../../types";

describe("AdminLogin Component", () => {
  const onLoginSuccess = vi.fn();

  beforeEach(() => {
    onLoginSuccess.mockClear();
  });

  test("Renderiza los campos del formulario correctamente", () => {
    render(<AdminLogin onLoginSuccess={onLoginSuccess} />);

    expect(screen.getByText("ADMIN PANEL")).toBeInTheDocument();
    expect(screen.getByLabelText("EMAIL ADMINISTRADOR:")).toBeInTheDocument();
    expect(screen.getByLabelText("CONTRASEÑA:")).toBeInTheDocument();
  });

  test("Inicia sesión correctamente con credenciales válidas", () => {
    render(<AdminLogin onLoginSuccess={onLoginSuccess} />);

    fireEvent.change(screen.getByLabelText("EMAIL ADMINISTRADOR:"), {
      target: { value: ADMIN_CREDENTIALS.email },
    });

    fireEvent.change(screen.getByLabelText("CONTRASEÑA:"), {
      target: { value: ADMIN_CREDENTIALS.password },
    });

    fireEvent.click(screen.getByRole("button", { name: "INICIAR SESIÓN" }));

    expect(onLoginSuccess).toHaveBeenCalledTimes(1);
  });

  test("Muestra un mensaje de error si las credenciales son incorrectas", () => {
    render(<AdminLogin onLoginSuccess={onLoginSuccess} />);

    fireEvent.change(screen.getByLabelText("EMAIL ADMINISTRADOR:"), {
      target: { value: "fail@test.com" },
    });

    fireEvent.change(screen.getByLabelText("CONTRASEÑA:"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: "INICIAR SESIÓN" }));

    expect(
      screen.getByText("❌ Credenciales incorrectas. Acceso denegado.")
    ).toBeInTheDocument();

    expect(onLoginSuccess).not.toHaveBeenCalled();
  });

  test("El botón VOLVER A LA TIENDA cambia window.location.href a '/'", () => {
    const originalLocation = window.location;

    delete (window as any).location;
    window.location = { href: "" } as any;

    render(<AdminLogin onLoginSuccess={onLoginSuccess} />);

    fireEvent.click(
      screen.getByRole("button", { name: "VOLVER A LA TIENDA" })
    );

    expect(window.location.href).toBe("/");

    window.location = originalLocation;
  });
});
