import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";
import { HotelsProvider } from "./context/hotel-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HotelsProvider>
      <App />
    </HotelsProvider>
  </StrictMode>
);
