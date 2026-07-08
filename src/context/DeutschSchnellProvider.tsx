import { createContext, useContext, useState } from "react";
import { CoursesLessonsInitialState } from "../constants/CoursesMaterials";

export const DeutschSchnellContext = createContext(undefined);

export function DeutschSchnellProvider({children})
{
    const [userLessons, setUserLessons] = useState(CoursesLessonsInitialState);
    return (
        <DeutschSchnellContext.Provider value={{userLessons, setUserLessons}}>
            {children}
        </DeutschSchnellContext.Provider>
    );
}

export function useDeutschSchnell()
{
    const context = useContext(DeutschSchnellContext);

    if(context === undefined)
    {
        throw new Error("useDeutschSchnell must be used inside DeutschSchenllProvider");
    }
    return context;
}