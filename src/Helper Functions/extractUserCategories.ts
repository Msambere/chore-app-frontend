import ChoreResponse from "~/types/Response/ChoreResponse";

export const extractUserCategories = (chores: ChoreResponse[]): string[] => {
  const categories: string[] = [];
  chores.forEach((chore) => {
    categories.push(chore.category);
  });
  return categories;
}