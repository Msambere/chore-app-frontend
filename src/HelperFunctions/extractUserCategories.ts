import ChoreResponse from "~/types/Response/ChoreResponse";

export const extractUserCategories = (chores: ChoreResponse[]): string[] => {
  const categories: Set<string> = new Set<string>();
  chores.forEach((chore) => {
    categories.add(chore.category);
  });
  return Array.from(categories).sort();
};
