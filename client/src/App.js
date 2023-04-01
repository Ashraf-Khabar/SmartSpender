import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Home from "./components/Home";
import styles from "./index.css";
import { useState } from "react";
import Footer from "./components/Footer";

function App() {

  const [isChecked, setIsChecked] = useState(false);
  const [darkModeValue, setDarkModeValue] = useState('forest');
  const [userId, setUserId] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Navbar isChecked={isChecked} setDarkModeValue={setDarkModeValue} darkModeValue={darkModeValue} setIsChecked={setIsChecked} userId={userId} setUserId={setUserId} />
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
        <Footer darkModeValue={darkModeValue} />
      </BrowserRouter>
    </>
  );
}

export default App;