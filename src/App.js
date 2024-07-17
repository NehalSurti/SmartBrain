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

  const loadUser = (data) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    }));
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

  const onButtonSubmit = () => {
    setState((prevState) => ({ ...prevState, imageUrl: state.input }));
    fetch(imageurlRoute, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch(imageRoute, {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              setState((prevState) => ({
                ...prevState,
                user: { ...prevState.user, entries: count },
              }));
            })
            .catch(console.log);
        }
        displayFaceBox(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (route) => {
    if (route === "signout") {
      setState(initialState);
    } else if (route === "home") {
      setState((prevState) => ({ ...prevState, isSignedIn: true }));
    }
    setState((prevState) => ({ ...prevState, route: route }));
  };

  const { isSignedIn, imageUrl, route, box, user } = state;

  return (
    <div className="App">
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
      <Navigation
        isSignedIn={isSignedIn}
        onRouteChange={onRouteChange}
      ></Navigation>
      {route === "home" ? (
        <div>
          <Logo></Logo>
          <Rank name={user.name} entries={user.entries}></Rank>
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          ></ImageLinkForm>
          <FaceRecognition box={box} imageUrl={imageUrl}></FaceRecognition>
        </div>
      ) : route === "signin" ? (
        <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
      ) : (
        <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )}
    </div>
  );
}

export default App;
