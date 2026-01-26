import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./globals.css";
import NotFound from "./pages/NotFound.tsx";
import LessonView from "./pages/LessonView.tsx";
import SelectLevelInterface from "./components/Test/SelectLevelInterface.tsx";
import Tests from "./components/Test/Test.tsx";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <BrowserRouter basename="/">
                <Routes>
                    <Route index path="/" Component={App} />
                    <Route path="*" Component={NotFound} />
                    <Route path="/courses/:courseId/:lessonId" Component={LessonView} />
                    <Route path="/tests" Component={SelectLevelInterface} />
                    <Route path="/tests/:level" Component={Tests} />
                </Routes>
            </BrowserRouter>
        </StrictMode >
    </QueryClientProvider>
);
