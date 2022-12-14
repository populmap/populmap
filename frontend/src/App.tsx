import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Event from "./pages/Event";
import Bookmark from "./pages/Bookmark";
import Login from "./pages/Login";
import Detail from "./pages/Detail";
import Signup from "./pages/Signup";
import ChangePassword from "./pages/ChangePassword";
import FindPassword from "./pages/FindPassword";
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
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/login" element={<Login />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/*" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
