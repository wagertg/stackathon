import React from "react";
import { createRoot } from "react-dom/client";
import App from "./Components/App";
import { Provider } from "react-redux";
import store from "./store";
import { HashRouter } from "react-router-dom";

// 'createRoot' creates a root node at the element with the id 'root'.

const root = createRoot(document.querySelector("#root"));

// Renders the main App component. Wraps it with Redux Provider and React Router's HashRouter.
// The Provider makes the Redux store available to all components in the app.
// The HashRouter is a router type in React Router, which uses URL hashes for routing.
root.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
);
