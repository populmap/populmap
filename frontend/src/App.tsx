import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSpinner from "./components/spinner/LoadingSpinner";
const Main = lazy(() => import("./pages/Main"));
const Event = lazy(() => import("./pages/Event"));
const Bookmark = lazy(() => import("./pages/Bookmark"));
const Login = lazy(() => import("./pages/Login"));
const Detail = lazy(() => import("./pages/Detail"));
const Signup = lazy(() => import("./pages/Signup"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const FindPassword = lazy(() => import("./pages/FindPassword"));
import gaTracker from "./network/ga/gaTracker";
import GlobalStyle from "./styles/GlobalStyle";

function App(): JSX.Element {
  gaTracker();
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Suspense fallback={<LoadingSpinner />}>
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
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
