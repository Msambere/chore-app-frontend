import ChoreResponse from "~/types/Response/ChoreResponse";

const filterData = (
  data: ChoreResponse[],
  filterValues: string[],
  recurrenceList: string[],
  categoryList: string[],
): ChoreResponse[] => {
  if (data === null || data.length === 0) {
    return data;
  }
  if (filterValues.length === 0) {
    return data;
  }
  const recurrenceValues = filterValues.filter((value) =>
    recurrenceList.includes(value),
  );

  const categoryValues = filterValues.filter((value) =>
    categoryList.includes(value),
  );

  let filteredData: ChoreResponse[] = [];
  if (recurrenceValues.length === 0) {
    filteredData = data.filter((chore) =>
      categoryValues.includes(chore.category),
    );
  } else if (categoryValues.length === 0) {
    filteredData = data.filter((chore) =>
      recurrenceValues.includes(chore.recurrence),
    );
  } else {
    filteredData = data.filter(
      (chore) =>
        recurrenceValues.includes(chore.recurrence) &&
        categoryValues.includes(chore.category),
    );
  }
  console.log(filterValues);
  console.log(filteredData.length);
  return filteredData;
};

export default filterData;
