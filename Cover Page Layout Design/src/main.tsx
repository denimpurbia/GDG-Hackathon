
  import { StrictMode } from "react";
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

  console.log("🚀 main.tsx loaded");
  
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    console.error("❌ Root element not found!");
    throw new Error("Root element not found");
  }
  
  console.log("✅ Root element found, mounting React app...");
  
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  console.log("✅ React app mounted successfully");
  