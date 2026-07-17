import { Material } from "../types/CourseMaterials";

export function insertBetween(array: Material[], item: Material) {
  if (array.length <= 1) return [...array];
  
  const result = [array[0]];
  
  for (let i = 1; i < array.length; i++) {
    result.push(item);
    result.push(array[i]);
  }
  
  return result;
}