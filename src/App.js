import React, { useState } from "react";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import Rank from "./components/Rank";
import ParticlesBg from "particles-bg";
import Signin from "./components/Signin";
import Register from "./components/Register";
import { imageRoute, imageurlRoute } from "./utils/APIRoutes";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "./utils/ToastOptions";
import "./App.css";

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

function App() {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const { isSignedIn, imageUrl, route, box, user } = state;

  const loadUser = (data) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.createdAt,
      },
    }));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setState(initialState);
    } else if (route === "home") {
      setState((prevState) => ({
        ...prevState,
        route: "home",
        isSignedIn: true,
      }));
    } else if (route === "register") {
      setState({ ...initialState, route: "register" });
    } else if (route === "signin") {
      setState(initialState);
    }
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setState((prevState) => ({ ...prevState, box: box }));
  };

  const onInputChange = (event) => {
    setState((prevState) => ({ ...prevState, input: event.target.value }));
  };

  const onButtonSubmit = async () => {
    setLoading(true); // Set loading state to true
    setState((prevState) => ({ ...prevState, imageUrl: state.input }));

    try {
      const response = await fetch(imageurlRoute, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: state.input,
        }),
      });

      const data = await response.json();

      if (data.status) {
        try {
          const putResponse = await fetch(imageRoute, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: state.user.id,
            }),
          });

          const putData = await putResponse.json();

          if (putData.status) {
            setState((prevState) => ({
              ...prevState,
              user: { ...prevState.user, entries: putData.entries },
            }));
          } else {
            toast.error(putData.message, toastOptions);
          }
        } catch (putError) {
          toast.error("Error fetching data", toastOptions);
          console.error("Error during PUT request:", putError);
        }

        displayFaceBox(calculateFaceLocation(data.response));
      } else {
        toast.error("Error fetching data", toastOptions);
      }
    } catch (fetchError) {
      toast.error("Error fetching data", toastOptions);
      console.error("Error during POST request:", fetchError);
    } finally {
      setLoading(false); // Reset loading state after the fetch operation
    }
  };

  return (
    <>
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
        {route === "home" ? (
          <>
            <Navigation
              isSignedIn={isSignedIn}
              onRouteChange={onRouteChange}
            ></Navigation>
            <Logo></Logo>
            <Section>
              <Rank name={user.name} entries={user.entries}></Rank>
              <ImageLinkForm
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}
              ></ImageLinkForm>
              <FaceRecognition box={box} imageUrl={imageUrl}></FaceRecognition>
            </Section>
            {loading && <LoadingIndicator></LoadingIndicator>}
          </>
        ) : route === "signin" ? (
          <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
        ) : (
          <Register loadUser={loadUser} onRouteChange={onRouteChange} />
        )}
      </AppContainer>
      <ToastContainer />
    </>
  );
}

export default App;

const AppContainer = styled.div`
  height: 100vh;
  width: 100vw;
`;

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
