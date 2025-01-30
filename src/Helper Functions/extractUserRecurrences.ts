import ChoreResponse from "~/types/Response/ChoreResponse";

export const extractUserRecurrences = (chores: ChoreResponse[]): string[] => {
  const recurrences: Set<string> = new Set<string>();
  chores.forEach((chore) => {
    recurrences.add(chore.recurrence);
  });
  return Array.from(recurrences);
};
