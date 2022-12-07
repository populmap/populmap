import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import muiCustomTheme from "./themes/muiCustomTheme";
import store from "./redux/store";
import App from "./App";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={muiCustomTheme}>
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
