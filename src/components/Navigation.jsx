import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function Navigation({ onRouteChange, isSignedIn }) {
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.removeItem("user");
    onRouteChange("signin");
    navigate("/signin");
  };

  if (isSignedIn) {
    return (
      <NavBar>
        <NavItem onClick={signOut}>Sign Out</NavItem>
      </NavBar>
    );
  }
}

const NavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  height: 100px;
  align-items: center;
`;

const NavItem = styled.p`
  color: black;
  padding: 3px;
  cursor: pointer;
  margin-right: 20px;
  z-index: 2;

  &:hover {
    opacity: 70%;
    text-decoration: underline;
  }
`;
