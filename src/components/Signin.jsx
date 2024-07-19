import React, { useState } from "react";
import { signinRoute } from "../utils/APIRoutes";
import styled from "styled-components";

export default function Signin({ onRouteChange, loadUser }) {
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const onEmailChange = (event) => {
    setSignInEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setSignInPassword(event.target.value);
  };

  const onSubmitSignIn = () => {
    fetch(signinRoute, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
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
              <Paragraph onClick={() => onRouteChange("register")}>
                DO NOT HAVE AN ACCOUNT?
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
