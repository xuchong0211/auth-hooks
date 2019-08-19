import React from "react";
import "./App.css";
import { ProvideAuth } from "./auth/user-auth";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <MainComponent />
      </ProvideAuth>
    </div>
  );
}

export default App;
