import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { imageRoute, imageurlRoute } from "../utils/APIRoutes";
import { toastOptions } from "../utils/ToastOptions";
import { InputUrlSchema } from "../utils/Validation";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const initialState = {
    input: "",
    imageUrl: "",
    box: {},
    isSignedIn: false,
    user: {
      id: "",
      name: "",
      email: "",
      entries: 0,
      joined: "",
      token: "",
    },
  };

  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Load user details
  const loadUser = (data) => {
    setState((prevState) => ({
      ...prevState,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.createdAt,
        token: data.token,
      },
    }));
  };

  // Handle route changes and signout
  const onRouteChange = (route) => {
    if (route === "signout") {
      setState(initialState);
    } else if (route === "home") {
      setState((prevState) => ({
        ...prevState,
        isSignedIn: true,
      }));
    } else if (route === "register") {
      setState(initialState);
    } else if (route === "signin") {
      setState(initialState);
    }
  };

  // Calculate face location in image
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

  // Display face box on the image
  const displayFaceBox = (box) => {
    setState((prevState) => ({ ...prevState, box: box }));
  };

  // Handle input change
  const onInputChange = (event) => {
    setState((prevState) => ({ ...prevState, input: event.target.value }));
  };

  // Handle button submit (API calls)
  const onButtonSubmit = async () => {
    setLoading(true); // Set loading state to true

    try {
      await InputUrlSchema.validate(
        { imageUrl: state.input },
        { abortEarly: false }
      );
    } catch (err) {
      setLoading(false);

      if (err.name === "ValidationError") {
        err.inner.forEach((error) => {
          toast.error(error.message, toastOptions);
        });
      }
      setState((prevState) => ({ ...prevState, imageUrl: "", box: {} }));
      return;
    }

    setState((prevState) => ({ ...prevState, imageUrl: state.input, box: {} }));

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

        if (data.response.outputs[0].data.regions.length === 0) {
          toast.error("Image does not have a face in it", toastOptions);
        } else {
          displayFaceBox(calculateFaceLocation(data.response));
        }
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

  // Update local storage whenever the user data changes
  useEffect(() => {
    if (state.user.id) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  // Load user from local storage on initial render
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      loadUser(user);
      onRouteChange("home");
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
        loading,
        setLoading,
        loadUser,
        onRouteChange,
        calculateFaceLocation,
        displayFaceBox,
        onInputChange,
        onButtonSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
