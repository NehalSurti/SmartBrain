import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ParticlesBg from "particles-bg";
import { useAppContext } from "./context/AppContext";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage ";
import SigninPage from "./pages/SigninPage ";
import RegisterPage from "./pages/RegisterPage ";

function App() {
  const { state } = useAppContext();
  const { isSignedIn} = state;
  return (
    <>
      <BrowserRouter>
        <AppContainer>
          <ParticlesBg
            color="#FFFFFF"
            num={120}
            type="cobweb"
            bg={{
              position: "absolute",
              zIndex: 1,
              top: 0,
              left: 0,
            }}
          />
          <Routes>
            {isSignedIn && (
              <>
                <Route path="/signin" element={<Navigate to="/" />} />
                <Route path="/register" element={<Navigate to="/" />} />
                <Route path="/" element={<HomePage />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </>
            )}
            {!isSignedIn && (
              <>
                <Route path="/signin" element={<SigninPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/*" element={<Navigate to="/signin" />} />
              </>
            )}
          </Routes>
        </AppContainer>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;
