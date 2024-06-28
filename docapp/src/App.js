import React from "react";
import Home from "./views/Home";
import Login from "./views/Logic";
import Register from "./views/Register";
import Document from "./views/Document";
import DocumentsList from "./views/DocumentsList";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/document" component={Document} />
        <Route exact path="/documents" component={DocumentsList} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
