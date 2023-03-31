import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Home from "./components/Home";
import styles from "./index.css";
import { useState } from "react";

function App() {

  const [isChecked, setIsChecked] = useState(false);
  const [darkModeValue, setDarkModeValue] = useState('cupcake');

  return (
    <>
      <BrowserRouter>
        <Navbar isChecked={isChecked} setDarkModeValue={setDarkModeValue} darkModeValue={darkModeValue} setIsChecked={setIsChecked}  />
        <Switch>
        <Route exact path="/">
            <Home darkModeValue={darkModeValue} />
          </Route>
          <Route exact path="/login">
            <Login darkModeValue={darkModeValue} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard darkModeValue={darkModeValue} />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;