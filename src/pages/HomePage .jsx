import React from "react";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import ImageLinkForm from "../components/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition";
import Rank from "../components/Rank";
import { useAppContext } from "../context/AppContext";
import styled from "styled-components";

function HomePage() {
  const { state, onRouteChange, onInputChange, onButtonSubmit, loading } =
    useAppContext();
  const { isSignedIn, imageUrl, box, user } = state;

  return (
    <>
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      <Logo />
      <Section>
        <Rank name={user.name} entries={user.entries} />
        <ImageLinkForm
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
        />
        <FaceRecognition box={box} imageUrl={imageUrl} />
      </Section>
      {loading && <LoadingIndicator />}
    </>
  );
}

export default HomePage;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 100px);
`;

const LoadingIndicator = styled.div`
  position: absolute;
  top: 48%;
  left: 48%;
  /* transform: translate(-50%, -50%); */
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
