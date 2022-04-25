import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import CreateItem from "./pages/CreateItem";
import ToDoList from './pages/ToDoList';
import UpdateItem from "./pages/UpdateItem";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { auth } from './firebase'
import { Spinner } from "./components/Spinner";

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  }, [])
  return firebaseUser !== false ? (
    <Router>
      <div className="container">
        <Navbar />
        <Switch>
          <Route component={CreateItem} path="/create" exact />
          <Route component={UpdateItem} path="/update/:id" exact />
          <Route component={Login} path="/login" exact />
          <Route component={ToDoList} path="/" exact />
        </Switch>
      </div>

    </Router>
  ) : (
    <Spinner />
  )
}

export default App;
