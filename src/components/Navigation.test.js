import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Navigation from "./Navigation";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Navigation Component", () => {
  const navigate = jest.fn();
  const mockOnRouteChange = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeAll(() => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
    });
  });

  test("renders sign out button when signed in", () => {
    render(<Navigation onRouteChange={mockOnRouteChange} isSignedIn={true} />);

    const signOutButton = screen.getByText("Sign Out");
    expect(signOutButton).toBeInTheDocument();
  });

  test("sign out process works correctly", () => {
    render(<Navigation onRouteChange={mockOnRouteChange} isSignedIn={true} />);

    const signOutButton = screen.getByText("Sign Out");
    fireEvent.click(signOutButton);

    expect(localStorage.removeItem).toHaveBeenCalledWith("user");
    expect(mockOnRouteChange).toHaveBeenCalledWith("signin");
    expect(navigate).toHaveBeenCalledWith("/signin");
  });

  test("does not render sign out button when not signed in", () => {
    render(<Navigation onRouteChange={mockOnRouteChange} isSignedIn={false} />);

    const signOutButton = screen.queryByText("Sign Out");
    expect(signOutButton).not.toBeInTheDocument();
  });
});
