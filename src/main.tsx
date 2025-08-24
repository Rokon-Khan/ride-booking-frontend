import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";

import { ThemeProvider } from "./providers/ThemeProvider.tsx";
import router from "./routes/router.tsx";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <ReduxProvider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <RouterProvider router={router} />
      </ThemeProvider>
     </ReduxProvider>
  </StrictMode>
);
