// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // Global styles
import App from "./App";
import { TreeProvider } from "./hooks/useTreeContext";

// import reportWebVitals from './reportWebVitals'; // if you use it

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <TreeProvider>
      <App />
    </TreeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
