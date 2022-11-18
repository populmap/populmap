import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import App from "./App";
import muiCustomTheme from "./themes/muiCustomTheme";
import store from "./redux/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={muiCustomTheme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
