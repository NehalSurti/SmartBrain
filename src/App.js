import "./App.css";
import Navigation from "./components/Navigation";
import Logo from "./components/Logo";
import ImageLinkForm from "./components/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition";

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
  const onRouteChange = () => {
  };

  return (
    <div className="App">
      <Navigation
        // isSignedIn={isSignedIn}
        onRouteChange={onRouteChange}
      ></Navigation>
      <Logo></Logo>
      <ImageLinkForm></ImageLinkForm>
      <FaceRecognition></FaceRecognition>
    </div>
  );
}

export default App;
