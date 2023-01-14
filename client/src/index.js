import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppContexProvider from "./Component/Context/appContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppContexProvider>
      <App />
    </AppContexProvider>
  </React.StrictMode>
);
