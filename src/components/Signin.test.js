import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { loginUserSchema } from "../utils/Validation";
import Signin from "./Signin";

// Mock the necessary modules
jest.mock("../context/AppContext");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));
jest.mock("../utils/APIRoutes", () => ({
  signinRoute: "/signin",
}));
jest.mock("../utils/Validation", () => ({
  loginUserSchema: {
    validate: jest.fn(),
  },
}));
jest.mock("../utils/ToastOptions", () => ({
  toastOptions: {},
}));

describe("Signin component", () => {
  const setSignInEmail = jest.fn();
  const setSignInPassword = jest.fn();
  const setLoading = jest.fn();
  const onRouteChange = jest.fn();
  const loadUser = jest.fn();
  const navigate = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Mock useAppContext hook
    useAppContext.mockReturnValue({
      onRouteChange,
      loadUser,
    });

    // Mock useNavigate hook
    useNavigate.mockReturnValue(navigate);
  });

  test("renders sign in form", () => {
    render(<Signin />);

    const legendElement = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "legend" && content === "SIGN IN"
      );
    });

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    // expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.getByText(/DO NOT HAVE AN ACCOUNT/i)).toBeInTheDocument();
    expect(legendElement).toBeInTheDocument();
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

  test("handles form submission successfully", async () => {
    const mockUser = { id: "1" };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUser),
      })
    );
    loginUserSchema.validate.mockResolvedValue(true);

    render(
      <>
        <Signin />
        <ToastContainer />
      </>
    );

    const signInButton = screen.getByText((content, element) => {
      return element.type === "submit" && element.value === "Sign in";
    });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/signin", expect.any(Object));
      expect(loadUser).toHaveBeenCalledWith(mockUser);
      expect(onRouteChange).toHaveBeenCalledWith("home");
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  test("handles form submission failure", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false, // Simulate a failed response
        status: 400,
        json: () => Promise.resolve({ message: "Login failed" }),
      })
    );
    loginUserSchema.validate.mockResolvedValue(true);

    render(
      <>
        <Signin />
        {/* <ToastContainer /> */}
      </>
    );

    const signInButton = screen.getByText((content, element) => {
      return element.type === "submit" && element.value === "Sign in";
    });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/signin", expect.any(Object));
      expect(screen.getByText("Login failed")).toBeInTheDocument();
    });
  });

  test("navigates to register on click", () => {
    render(<Signin />);
    const registerLink = screen.getByText(/DO NOT HAVE AN ACCOUNT/i);
    fireEvent.click(registerLink);

    expect(onRouteChange).toHaveBeenCalledWith("register");
    expect(navigate).toHaveBeenCalledWith("/register");
  });

  //   test('shows loading indicator during form submission', async () => {
  //     global.fetch = jest.fn(() => new Promise((resolve) => setTimeout(() => resolve({
  //       json: () => Promise.resolve({ id: '1' }),
  //     }), 1000)));
  //     loginUserSchema.validate.mockResolvedValue(true);

  //     render(<Signin />);

  //     const signInButton = screen.getByText(/Sign in/i);
  //     fireEvent.click(signInButton);

  //     expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();

  //     await waitFor(() => {
  //       expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
  //     });
  //   });
});
