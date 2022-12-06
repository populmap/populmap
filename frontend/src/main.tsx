import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import muiCustomTheme from "./themes/muiCustomTheme";
import store from "./redux/store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <ThemeProvider theme={muiCustomTheme}>
          <App />
        </ThemeProvider>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
