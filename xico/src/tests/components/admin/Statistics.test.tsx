import { render, screen } from "@testing-library/react";
import { Statistics } from "../../../components/admin/Statistics";
import React from "react";

describe("Statistics Component", () => {
    test("Renderiza correctamente los totales principales", () => {
        render(<Statistics />);

        expect(screen.getByText("VENTAS TOTALES")).toBeInTheDocument();
        expect(screen.getByText("PRODUCTOS VENDIDOS")).toBeInTheDocument();
        expect(screen.getByText("USUARIOS ACTIVOS")).toBeInTheDocument();
        expect(screen.getByText("PUNTOS OTORGADOS")).toBeInTheDocument();
    });

    test("Renderiza los porcentajes de forma correcta", () => {
        render(<Statistics />);

        const percentages = [
            /35%/,
            /28%/,
            /20%/,
            /12%/,
            /5%/
        ];

        percentages.forEach((regex) => {
            const matches = screen.queryAllByText(regex);
            expect(matches.length).toBeGreaterThan(0);
        });
    });


    test("Muestra correctamente los títulos de cada bloque", () => {
        render(<Statistics />);

        expect(screen.getByText("> ESTADÍSTICAS GENERALES")).toBeInTheDocument();
        expect(screen.getByText("> PRODUCTOS MÁS VENDIDOS")).toBeInTheDocument();
        expect(screen.getByText("> VENTAS POR CATEGORÍA")).toBeInTheDocument();
        expect(screen.getByText("> TENDENCIAS MENSUALES")).toBeInTheDocument();
    });
});
