import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router";
import "./index.css";

import { AuthProvider } from "./context/AuthContext.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import { store } from "./redux/store.ts";
import router from "./routes/router.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </ReduxProvider>
  </StrictMode>
);
