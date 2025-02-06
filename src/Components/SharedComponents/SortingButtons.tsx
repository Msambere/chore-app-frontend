import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { Dispatch, SetStateAction } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 125,
    },
  },
};

interface Props {
  recurrenceList: string[];
  categoryList: string[];
  setSortOrder: Dispatch<SetStateAction<string>>;
  setSortValue: Dispatch<SetStateAction<string>>;
  sortValue: string;
  sortOrder: string;
}

const SortingButtons = ({
  setSortOrder,
  setSortValue,
  sortValue,
  sortOrder,
}: Props) => {
  const handleSortValueChange = (event) => {
    setSortValue(event.target.value);
    console.log(sortValue);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    console.log(sortOrder);
  };
  const sortOptions = [
    "title",
    "recurrence",
    "category",
    "duration",
    "difficulty",
  ];

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 125 }}>
        <InputLabel htmlFor="sort-value-options">Sort by: </InputLabel>
        <Select
          id="sort-value-options"
          label="Sort by"
          value={sortValue}
          onChange={handleSortValueChange}
          MenuProps={MenuProps}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 125 }}>
        <InputLabel id="sort-order-label">Sort Order:</InputLabel>
        <Select
          labelId="sort-order-label"
          id="sort-order-options"
          value={sortOrder}
          onChange={handleSortOrderChange}
          autoWidth
          label="Sort Order:"
        >
          <MenuItem value={"asc"}>Ascending</MenuItem>
          <MenuItem value={"desc"}>Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SortingButtons;
