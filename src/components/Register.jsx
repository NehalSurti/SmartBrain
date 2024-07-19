import React, { useState } from "react";
import styled from "styled-components";
import { registerRoute } from "../utils/APIRoutes";

export default function Register({ loadUser, onRouteChange }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch(registerRoute, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          loadUser(user);
          onRouteChange("home");
        }
      });
  };

  return (
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
                  onChange={onNameChange}
                />
              </Div>
              <Div>
                <Label htmlFor="email-address">Email</Label>
                <Input
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </Div>
              <Div>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
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
              <Paragraph onClick={() => onRouteChange("signin")}>
                ALREADY HAVE AN ACCOUNT?
              </Paragraph>
            </div>
          </Measure>
        </Main>
      </Article>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
