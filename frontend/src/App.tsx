import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Event from "./pages/Event";
import Login from "./pages/Login";
import gaTracker from "./network/ga/gaTracker";
import GlobalStyle from "./styles/GlobalStyle";

function App(): JSX.Element {
  gaTracker();
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/event" element={<Event />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
