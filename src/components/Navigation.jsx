import React from "react";
import styled from "styled-components";

export default function Navigation({ onRouteChange, isSignedIn }) {
  if (isSignedIn) {
    return (
      <NavBar>
        <NavItem onClick={() => onRouteChange("signout")}>Sign Out</NavItem>
      </NavBar>
    );
  } else {
    return (
      <NavBar>
        <NavItem onClick={() => onRouteChange("signin")}>Sign In</NavItem>
        <NavItem onClick={() => onRouteChange("register")}>Register</NavItem>
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
  cursor: pointer;
  color: black;
  text-decoration: underline;
  padding: 3px;

  &:hover {
    opacity: 50%;
  }
`;
