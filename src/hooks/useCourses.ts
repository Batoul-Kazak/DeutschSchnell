import { useQuery } from "@tanstack/react-query";

const fetchCourses = async () => {
  const response = await fetch("data/courses.json");

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }
  return response.json();
};

/**
 * Custom hook for fetching course catalog with 5min cache.
 * Prevents unnecessary refetches on window focus/background tabs.
 */
export const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
