const sortData = (data, sortOptions, sortValue, sortOrder) => {
  const key = sortOptions[sortValue];
  let sortedData;
  if (data === null || data.length === 0) {
    return data;
  }
  if (Array.isArray(key)) {
    let getLength = null
    let lookup ="";
    for (let i of key){
      if (i === "length"){
        getLength = true;
      }else {
        lookup += `${i}`;
      }
    }
    if (getLength) {
      sortedData = data.toSorted((a, b) => {
        return sortOrder === "asc"
          ? a[lookup].length - b[lookup].length
          : b[lookup].length - a[lookup].length;
      });
    } // could add logic for when there are nested keys, but that is outside of the scope to this project
  } else if (typeof data[0][key] === "string") {
    sortedData = data.toSorted((a, b) => {
      return sortOrder === "asc" ? a[key].localeCompare(b[key]) : b[key].localeCompare(a[key]);

    });
  } else {
    sortedData = data.toSorted((a, b) => {
      return sortOrder === "asc" ? a[key] - b[key] : b[key] - a[key];
    });
  }
  return sortedData;
}
export default sortData;