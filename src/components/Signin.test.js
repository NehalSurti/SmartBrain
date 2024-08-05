import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import Signin from "./Signin";
import { toastOptions } from "../utils/ToastOptions";
import { loginUserSchema } from "../utils/Validation";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

// Mock the necessary modules
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
  ToastContainer: () => <div />,
}));
jest.mock("../utils/APIRoutes", () => ({
  signinRoute: "/signin",
}));
jest.mock("../utils/Validation", () => ({
  loginUserSchema: {
    validate: jest.fn(),
  },
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

describe("Signin component", () => {
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

  test("renders sign in form", () => {
    render(<Signin />);

    const legendElement = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "legend" && content === "SIGN IN"
      );
    });

    const emailInput = screen.getByText((content, element) => {
      return element.type === "email" && element.name === "email-address";
    });

    const passwordInput = screen.getByText((content, element) => {
      return element.type === "password" && element.name === "password";
    });

    const signinButton = screen.getByText((content, element) => {
      return element.type === "submit" && element.value === "Sign in";
    });

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/DO NOT HAVE AN ACCOUNT/i)).toBeInTheDocument();
    expect(legendElement).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signinButton).toBeInTheDocument();
  });

  test("updates state on input change", () => {
    render(<Signin />);
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password");
  });

  test("validates input and shows error messages", async () => {
    loginUserSchema.validate.mockRejectedValue({
      name: "ValidationError",
      inner: [
        { message: "Email is invalid" },
        { message: "Password is too short" },
      ],
    });

    render(<Signin />);

    const signinButton = screen.getByText((content, element) => {
      return element.type === "submit" && element.value === "Sign in";
    });

    fireEvent.click(signinButton);

    await waitFor(() => {
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

  test("handles form submission successfully", async () => {
    loginUserSchema.validate.mockResolvedValue(true);
    const mockUser = { id: 1, email: "test@example.com", name: "Test User" };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser),
      })
    );

    render(<Signin />);

    const signinButton = screen.getByText((content, element) => {
      return element.type === "submit" && element.value === "Sign in";
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(signinButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/signin", expect.any(Object));
      expect(mockLoadUser).toHaveBeenCalledWith(mockUser);
      expect(mockOnRouteChange).toHaveBeenCalledWith("home");
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  test("handles form submission failure", async () => {
    loginUserSchema.validate.mockResolvedValue(true);
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: "Login failed" }),
      })
    );

    render(<Signin />);

    const signinButton = screen.getByText((content, element) => {
      return element.type === "submit" && element.value === "Sign in";
    });
    fireEvent.click(signinButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Login failed", toastOptions);
    });
  });

  test("navigates to register on click", () => {
    render(<Signin />);
    const registerLink = screen.getByText(/DO NOT HAVE AN ACCOUNT/i);
    fireEvent.click(registerLink);

    expect(mockOnRouteChange).toHaveBeenCalledWith("register");
    expect(navigate).toHaveBeenCalledWith("/register");
  });

  test("shows loading indicator during form submission", async () => {
    loginUserSchema.validate.mockResolvedValue(true);
    // global.fetch = jest.fn(
    //   () =>
    //     new Promise((resolve) =>
    //       setTimeout(
    //         () =>
    //           resolve({
    //             ok: true,
    //             json: () => Promise.resolve({ id: "1" }),
    //           }),
    //         1000
    //       )
    //     )
    // );

    const mockUser = { id: 1, email: "test@example.com", name: "Test User" };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser),
      })
    );

    render(<Signin />);

    const signinButton = screen.getByText((content, element) => {
      return element.type === "submit" && element.value === "Sign in";
    });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(signinButton);

    expect(screen.getByTestId("loading-indicator")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId("loading-indicator")).not.toBeInTheDocument();
    });
  });
});
