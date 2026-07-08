import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import "./globals.css";     
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import NotFound from "./pages/NotFound.tsx";
import LessonView from "./pages/LessonView.tsx";
import SelectLevelInterface from "./pages/Test/SelectLevelInterface.tsx";
import Tests from "./pages/Test/Test.tsx";
import CourseMaterials from "./pages/CourseMaterials.tsx";
import Quiz from "./pages/LessonComponents/Quiz.tsx";
import CourseContent from "./pages/LessonComponents/CourseContent.tsx";
import TestPage from "./pages/TestPage.tsx";
import { DeutschSchnellProvider } from "./context/DeutschSchnellProvider.tsx";

const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <DeutschSchnellProvider>
            <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <BrowserRouter basename="/">
                    <Routes>
                        <Route index path="/" Component={App} />
                        <Route path="/courses/:courseId:contentId" Component={CourseContent} />

                        <Route path="/courses/:courseId" Component={CourseMaterials} />
                        <Route path="/courses/:courseId/:lessonId" Component={LessonView} />

                        <Route path="/tests" Component={SelectLevelInterface} />
                        <Route path="/tests/:level" Component={Tests} />

                        <Route path="*" Component={NotFound} />
                        <Route path="/test-page" Component={TestPage} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </QueryClientProvider>
        </DeutschSchnellProvider>
    </StrictMode >
);
