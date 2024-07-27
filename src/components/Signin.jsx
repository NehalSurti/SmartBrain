import React, { useState } from "react";
import { signinRoute } from "../utils/APIRoutes";
import { loginUserSchema } from "../utils/Validation";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { toastOptions } from "../utils/ToastOptions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

export default function Signin() {
  // State hooks for managing form data and loading state
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { onRouteChange, loadUser } = useAppContext();
  const navigate = useNavigate();

  // Event handler for email input field change
  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  // Event handler for password input field change
  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  // Event handler for form submission
  const onSubmitSignIn = async () => {
    setLoading(true); // Set loading state to true

    try {
      // Validate user input using schema
      await loginUserSchema.validate(
        { email: signInEmail, password: signInPassword },
        { abortEarly: false }
      );
    } catch (err) {
      setLoading(false); // Reset loading state regardless of validation outcome

      // If validation fails, show toast notifications for each error
      if (err.name === "ValidationError") {
        err.inner.forEach((error) => {
          toast.error(error.message, toastOptions);
        });
      }
      return; // Stop execution if validation fails
    }

    try {
      // Make POST request to login the user
      const response = await fetch(signinRoute, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
      });

      const user = await response.json();

      // If login is successful, update user state and route
      if (user.id) {
        localStorage.setItem("user", JSON.stringify(user));
        setSignInEmail("");
        setSignInPassword("");
        loadUser(user);
        onRouteChange("home");
        navigate("/");
      } else {
        toast.error(user.message, toastOptions);
      }
    } catch (error) {
      // Show error toast if login fails
      toast.error("Login not successful", toastOptions);
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    } finally {
      setLoading(false); // Reset loading state after the fetch operation
    }
  };

  const handleClick = () => {
    onRouteChange("register");
    navigate("/register");
  };

  return (
    <>
      <Wrapper>
        <Article>
          <Main>
            <Measure>
              <Fieldset id="sign_up">
                <Legend>SIGN IN</Legend>
                <div>
                  <Label htmlFor="email-address">Email</Label>
                  <Input
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={onEmailChange}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={onPasswordChange}
                  />
                </div>
              </Fieldset>
              <div>
                <SubmitInput
                  onClick={onSubmitSignIn}
                  type="submit"
                  value="Sign in"
                />
              </div>
              <div>
                <Paragraph onClick={handleClick}>
                  DO NOT HAVE AN ACCOUNT?
                </Paragraph>
              </div>
            </Measure>
          </Main>
        </Article>
        {loading && <LoadingIndicator></LoadingIndicator>}
      </Wrapper>
      <ToastContainer />
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Article = styled.article`
  border-radius: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  width: 100%;
  max-width: 24rem;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
  background: linear-gradient(89deg, #ff5edf 0%, #04c8de 100%);
  opacity: 0.8;
  position: relative;
`;

const Main = styled.main`
  padding: 2rem;
  color: #333;
`;

const Measure = styled.div`
  max-width: 30rem;
  margin: 0 auto;
`;

const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 0;
`;

const Legend = styled.legend`
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  background: transparent;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #000;

  &:hover {
    color: white;
  }
`;

const SubmitInput = styled.input`
  padding: 0.75rem 1.5rem;
  border: 1px solid black;
  background: transparent;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: black;
    color: white;
  }
`;

const Paragraph = styled.p`
  cursor: pointer;
  color: black;
  text-decoration: none;
  margin-top: 0.7rem;
  font-size: smaller;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingIndicator = styled.div`
  position: absolute;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  border: 10px solid #f3f3f3;
  border-top: 10px solid #bf34db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
  z-index: 5;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
