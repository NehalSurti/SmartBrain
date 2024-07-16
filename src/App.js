import "./App.css";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";
import Rank from "./components/Rank";
import ParticlesBg from "particles-bg";

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
  const onRouteChange = () => {};

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
        // isSignedIn={isSignedIn}
        onRouteChange={onRouteChange}
      ></Navigation>
      <Logo></Logo>
      <Rank></Rank>
      <ImageLinkForm></ImageLinkForm>
      <FaceRecognition></FaceRecognition>
    </div>
  );
}

export default App;
