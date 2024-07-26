import React from "react";
import styled from "styled-components";

export default function Navigation({ onRouteChange, isSignedIn }) {
  if (isSignedIn) {
    return (
      <NavBar>
        <NavItem onClick={() => onRouteChange("signout")}>Sign Out</NavItem>
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
