import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Card from "./components/Card";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

function App() {
  const [progress, setprogress] = useState(0);

  return (
    <BrowserRouter>
      <Navbar />
      <div class="alert alert-danger al-error" role="alert">
        This is a danger alert—check it out!
      </div>
      <div class="alert alert-success al-success" role="alert">
        This is a danger alert—check it out!
      </div>
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        Post link has been copied to clipboard..please share when contest Starts ;)
        <button
          type="button"
          class="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <LoadingBar
        progress={progress}
        onLoaderFinished={() => setprogress(0)}
        color="#f11946"
      />
      <Routes>
        <Route path="/" element={<Home setprogress={setprogress} />} />
        <Route
          path="register"
          element={<Register setprogress={setprogress} />}
        />
        <Route path="/post/:id" element={<Card setprogress={setprogress} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
