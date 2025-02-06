import ChoreResponse from "~/types/Response/ChoreResponse";

const sortData = (
  data: ChoreResponse[],
  sortValue: string,
  sortOrder: string,
): ChoreResponse[] => {
  const sortedData: ChoreResponse[] = data;
  if (sortedData === null || sortedData.length === 0) {
    return sortedData;
  } else {
    sortedData.sort((a, b) => {
      if (
        typeof b[sortValue] === "string" &&
        typeof a[sortValue] === "string"
      ) {
        if (sortOrder === "asc") {
          return a[sortValue].localeCompare(b[sortValue]);
        } else {
          return b[sortValue].localeCompare(a[sortValue]);
        }
      } else if (
        typeof b[sortValue] === "number" &&
        typeof a[sortValue] === "number"
      ) {
        return sortOrder === "asc"
          ? a[sortValue] - b[sortValue]
          : b[sortValue] - a[sortValue];
      }
    });
  }
  return sortedData;
};
export default sortData;
