import ChoreResponse from "~/types/Response/ChoreResponse";

export const extractUserRecurrences = (chores: ChoreResponse[]): string[] => {
  const recurrences: string[] = [];
  chores.forEach((chore) => {
    recurrences.push(chore.recurrence);
  });
  return recurrences;
}