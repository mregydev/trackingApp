import { render, screen, fireEvent } from "@testing-library/react";
import MapTools from "../MapTool";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, expect, it, vi } from "vitest";
import store from "../../../store"; 
import { LatLngBoundsExpression } from "leaflet";
import '@testing-library/jest-dom';

vi.mock("react-leaflet", () => ({
  ...vi.importActual("react-leaflet"),
  useMap: () => ({
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
    fitBounds: vi.fn(),
  }),
}));

describe("MapTools Component", () => {
  const mockBounds:LatLngBoundsExpression = [
    [50.917, 6.844], // Southwest corner
    [50.972, 7.08], // Northeast corner
  ];

  const createTestStore = () => store;

  const renderComponent = (store: ReturnType<typeof configureStore>) =>
    render(
      <Provider store={store}>
        <MapTools bounds={mockBounds} />
      </Provider>
    );

  it("should render all tools correctly", () => {
    const store = createTestStore();
    renderComponent(store);

    expect(screen.getByRole("button", { name: /zoom In/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /zoom out/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /fit screen/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /english/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /deutsch/i })).toBeInTheDocument();
  });


  it("should dispatch changeLocale action on language change", () => {
    const store = createTestStore();
    renderComponent(store);

    const enButton = screen.getByRole("button", { name: /english/i });
    fireEvent.click(enButton);

    const locale = store.getState().locale;
    
    expect(locale).toBe('en');
  });

});
