import React, { useState } from "react";
import styled from "styled-components";
import { registerRoute } from "../utils/APIRoutes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "../utils/ToastOptions";
import { registerUserSchema } from "../utils/Validation";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Register() {
  // State hooks for managing form data and loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { onRouteChange, loadUser } = useAppContext();
  const navigate = useNavigate();

  // Event handler for name input field change
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  // Event handler for email input field change
  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Event handler for password input field change
  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Event handler for form submission
  const onSubmitSignIn = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Validate user input using schema
      await registerUserSchema.validate(
        { name, email, password },
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
      // Make POST request to register the user
      const response = await fetch(registerRoute, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const user = await response.json();

      // If registration is successful, update user state and route
      if (user.id) {
        localStorage.setItem("user", JSON.stringify(user));
        setEmail("");
        setPassword("");
        setName("");
        loadUser(user);
        onRouteChange("home");
        navigate("/");
      } else {
        toast.error(user.message, toastOptions);
      }
    } catch (error) {
      // Show error toast if registration fails
      toast.error("Registration not successful", toastOptions);
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    } finally {
      setLoading(false); // Reset loading state after the fetch operation
    }
  };

  const handleClick = () => {
    onRouteChange("signin");
    navigate("/signin");
  };

  return (
    <>
      <Wrapper>
        <Article>
          <Main>
            <Measure>
              <Fieldset>
                <Legend>REGISTER</Legend>
                <Div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={onNameChange}
                  />
                </Div>
                <Div>
                  <Label htmlFor="email-address">Email</Label>
                  <Input
                    type="email"
                    name="email-address"
                    id="email-address"
                    value={email}
                    onChange={onEmailChange}
                  />
                </Div>
                <Div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={onPasswordChange}
                  />
                </Div>
              </Fieldset>
              <div>
                <SubmitButton
                  onClick={onSubmitSignIn}
                  type="submit"
                  value="Register"
                />
              </div>
              <div>
                <Paragraph onClick={handleClick}>
                  ALREADY HAVE AN ACCOUNT?
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
  width: 100vw;
`;

const Article = styled.article`
  border-radius: 0.25rem;
  border: 1px solid #0000001a;
  margin: 2rem 0;
  width: 100%;
  max-width: 24rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
  z-index: 2;
  background: linear-gradient(89deg, #ff5edf 0%, #04c8de 100%);
  opacity: 0.8;
  position: relative;
`;

const Main = styled.main`
  padding: 2rem;
  color: #202020;
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
  font-size: 2rem;
  font-weight: 600;
  padding: 0;
  margin: 0;
`;

const Div = styled.div`
  margin-top: 1rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #000;
  background-color: transparent;
  width: 100%;
  &:hover {
    /* background-color: #000; */
    color: #fff;
  }
`;

const SubmitButton = styled.input`
  padding: 0.75rem 1.5rem;
  border: 1px solid black;
  background: transparent;
  cursor: pointer;
  transition: background 0.3s;
  margin-top: 1rem;

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
