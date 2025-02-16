import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { Toaster } from "react-hot-toast";
import App from "./features/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
