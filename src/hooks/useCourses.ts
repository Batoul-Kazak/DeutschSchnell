import { useQuery } from "@tanstack/react-query";

const fetchCourses = async () => {
    const response = await fetch("data/courses.json");

    if(!response.ok)
    {
        throw new Error("Faild to fetch courses")
    }
    return response.json();
}

export const useCourses = () => {
    return useQuery({
        queryKey: ['courses'],
        queryFn: fetchCourses,
        staleTime: 5 * 60 * 1000
    })
}