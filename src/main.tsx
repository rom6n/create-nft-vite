import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { BrowserRouter } from "react-router-dom";
import TelegramAnalytics from "@telegram-apps/analytics";

TelegramAnalytics.init({
  token: import.meta.env.VITE_TG_ANALYTICS_KEY,
  appName: import.meta.env.VITE_TMA_IDENTIFIER,
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <TonConnectUIProvider manifestUrl="https://rom6n.github.io/mc1f/tonconnect-manifest.json">
      <StrictMode>
        <App />
      </StrictMode>
    </TonConnectUIProvider>
  </BrowserRouter>
);
