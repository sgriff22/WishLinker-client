import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { ApplicationViews } from "./components/views/ApplicationViews";
import AppContext from "./context/AppContext";
import { getCurrentUserProfile } from "./components/services/profile";

function App() {
  const [profile, setProfile] = React.useState({});

  useEffect(() => {
    getCurrentUserProfile().then((res) => {
      setProfile(res);
    });
  }, []);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ profile, setProfile }}>
        <ApplicationViews />
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
