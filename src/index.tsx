import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import "./globals.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <App />
        </StrictMode >
    </QueryClientProvider>
);
