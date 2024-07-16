import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "../assets/images/brain.png";
import styled from "styled-components";

export default function Logo() {
  return (
    <LogoContainer>
      <TiltWrapper options={{ max: 55 }}>
        <LogoWrapper>
          <LogoImg alt="logo" src={brain} />
        </LogoWrapper>
      </TiltWrapper>
    </LogoContainer>
  );
}

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  cursor: pointer;
  z-index: 2;
`;

const TiltWrapper = styled(Tilt)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  background: linear-gradient(89deg, #ff5edf 0%, #04c8de 100%);
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const LogoWrapper = styled.div`
  padding: 5px;
  height: 75%;
  width: 75%;
`;

const LogoImg = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;
