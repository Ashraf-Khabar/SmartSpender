import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";
import styles from "./index.css";
import { useState } from "react";
import Footer from "./components/Footer";
import Setting from "./components/Setting/Setting";
import DivisionsStat from "./components/statistics/Divisions";
import Divisions from "./components/seeMore/Divisions";
import Expenses from "./components/seeMore/Expenses";
import ExpensesStat from "./components/statistics/Expenses";
import AboutUsPage from "./components/AboutUsPage";
import BlogTest from "./components/blogs";

function App() {

  const [isChecked, setIsChecked] = useState(false);
  const [darkModeValue, setDarkModeValue] = useState('forest');
  const [userId, setUserId] = useState(null);

  return (
    <>
      <BrowserRouter>
        <Navbar isChecked={isChecked} setDarkModeValue={setDarkModeValue} darkModeValue={darkModeValue} setIsChecked={setIsChecked} userId={userId} setUserId={setUserId} />
        <Switch>
          <Route exact path="/dashboard/Blogs">
            <BlogTest darkModeValue={darkModeValue}  />
          </Route>
          <Route exact path="/">
            <Home darkModeValue={darkModeValue} />
          </Route>
          <Route path="/about">
            <AboutUsPage darkModeValue={darkModeValue} />
          </Route>
          <Route exact path="/login">
            <Login darkModeValue={darkModeValue} />
          </Route>
          <Route path="/signup">
            <Signup darkModeValue={darkModeValue} />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard darkModeValue={darkModeValue} />
          </Route>
          <Route path="/Setting">
            <Setting darkModeValue={darkModeValue} />
          </Route>
          <Route exact path="/dashboard/divisionsStat">
            <DivisionsStat darkModeValue={darkModeValue} />
          </Route>
          <Route exact path="/dashboard/ExpensessStat">
            <ExpensesStat darkModeValue={darkModeValue} />
          </Route>
          <Route path="/dashboard/divisions">
            <Divisions darkModeValue={darkModeValue} />
          </Route>
          <Route path="/dashboard/expenses">
            <Expenses darkModeValue={darkModeValue} />
          </Route>
        </Switch>
        <Footer darkModeValue={darkModeValue} />
      </BrowserRouter>
    </>
  );
}

export default App;