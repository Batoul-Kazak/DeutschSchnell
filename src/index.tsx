import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, createBrowserRouter, createHashRouter, HashRouter, Outlet, Route, RouterProvider, Routes } from "react-router-dom"

import "./globals.css";
import HeroSection from "./components/HeroSection/HeroSection.tsx";
import ServicesSection from "./components/ServicesSection/ServicesSection.tsx";
import Team from "./components/Team/Team.tsx";
import Events from "./components/Events/Events.tsx";
import Contactus from "./components/ContactUs/Contactus.tsx";
import NotFound from "./pages/NotFound.tsx";
import Courses from "./components/Courses/Courses.tsx";
import LessonView from "./pages/LessonView.tsx";



// const router = createHashRouter([
//     {
//         path: '/',
//         element: <App />,
//         errorElement: <NotFound />,
//         children: [{
//             index: true,
//             element: (
//                 <>
//                     <HeroSection />
//                     <ServicesSection />
//                     <Team />
//                     <div className="flex flex-col gap-20">
//                         <Events />
//                         <Contactus />
//                     </div>
//                 </>
//             )
//         },
//         {
//             path: "courses",
//             children: [
//                 { element: <Courses /> },
//                 {
//                     path: ":courseId/:lessonId",
//                     element: <LessonView />,
//                 }
//             ]
//         },
//         { path: "*", element: <NotFound /> }
//         ],
//     }
// ])

const queryClient = new QueryClient();


createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <BrowserRouter basename="/">
                <Routes>
                    <Route index path="/" Component={App} />
                    <Route path="*" Component={NotFound} />
                    <Route path="/courses/:courseId/:lessonId" Component={LessonView} />
                    <Route path="/tests/" />
                </Routes>
            </BrowserRouter>
        </StrictMode >
    </QueryClientProvider>
);
