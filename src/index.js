import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import Starting from "./components/Starting";
import Profile from "./components/Profile";
import Home from './components/Home';
import Polls from './components/Polls';

import reportWebVitals from "./reportWebVitals";
import { Route, BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

function Router() {
  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Route exact path="/" component={Starting} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/app" component={App} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/polls" component={Polls} />
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  );
}
ReactDOM.render(<Router />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

