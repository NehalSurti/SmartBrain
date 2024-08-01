import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import Register from "./Register";
import { toastOptions } from "../utils/ToastOptions";
import { registerUserSchema } from "../utils/Validation";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

// Mock dependencies
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
  ToastContainer: () => <div />,
}));
jest.mock("../utils/APIRoutes", () => ({
  registerRoute: "/register",
}));
jest.mock("../utils/Validation", () => ({
  registerUserSchema: {
    validate: jest.fn(),
  },
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

describe("Register component", () => {
  let mockOnRouteChange;
  let mockLoadUser;
  let navigate;

  beforeEach(() => {
    mockOnRouteChange = jest.fn();
    mockLoadUser = jest.fn();
    navigate = jest.fn();
    useAppContext.mockReturnValue({
      onRouteChange: mockOnRouteChange,
      loadUser: mockLoadUser,
    });
    useNavigate.mockReturnValue(navigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders register form", () => {
    render(<Register />);

    const legendElement = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "legend" && content === "REGISTER"
      );
    });

    const nameInput = screen.getByText((content, element) => {
      return element.type === "text" && element.name === "name";
    });

    const emailInput = screen.getByText((content, element) => {
      return element.type === "email" && element.name === "email-address";
    });

    const passwordInput = screen.getByText((content, element) => {
      return element.type === "password" && element.name === "password";
    });

    const registerButton = screen.getByText((content, element) => {
      return element.type === "submit" && element.value === "Register";
    });

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText(/already have an account/i)).toBeInTheDocument();
    expect(legendElement).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test("validates input and shows error messages", async () => {
    registerUserSchema.validate.mockRejectedValue({
      name: "ValidationError",
      inner: [
        { message: "Name is required" },
        { message: "Email is invalid" },
        { message: "Password is too short" },
      ],
    });

    render(<Register />);

    const registerButton = screen.getByText((content, element) => {
      return element.type === "submit" && element.value === "Register";
    });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Name is required",
        toastOptions
      );
      expect(toast.error).toHaveBeenCalledWith(
        "Email is invalid",
        toastOptions
      );
      expect(toast.error).toHaveBeenCalledWith(
        "Password is too short",
        toastOptions
      );
    });
  });

  test("registers user successfully", async () => {
    registerUserSchema.validate.mockResolvedValue(true);

    const mockUser = { id: 1, email: "test@example.com", name: "Test User" };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser),
      })
    );

    render(<Register />);

    const registerButton = screen.getByText((content, element) => {
      return element.type === "submit" && element.value === "Register";
    });

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/register", expect.any(Object));
      expect(mockLoadUser).toHaveBeenCalledWith(mockUser);
      expect(mockOnRouteChange).toHaveBeenCalledWith("home");
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  test("handles registration error", async () => {
    registerUserSchema.validate.mockResolvedValue(true);

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Registration failed" }),
      })
    );

    render(<Register />);

    const registerButton = screen.getByText((content, element) => {
      return element.type === "submit" && element.value === "Register";
    });

    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Registration failed",
        toastOptions
      );
    });
  });

  test("handles navigation to signin page", () => {
    render(<Register />);

    fireEvent.click(screen.getByText(/already have an account/i));

    expect(mockOnRouteChange).toHaveBeenCalledWith("signin");
    expect(navigate).toHaveBeenCalledWith("/signin");
  });
});
