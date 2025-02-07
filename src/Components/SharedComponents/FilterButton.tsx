import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { Dispatch, SetStateAction } from "react";
import { Box, Chip, ListSubheader, OutlinedInput } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface Props {
  recurrenceList: string[];
  categoryList: string[];
  setFilterValues: Dispatch<SetStateAction<string[]>>;
  filterValues: string[];
}

const FilterButton = ({
  recurrenceList,
  categoryList,
  setFilterValues,
  filterValues,
}: Props) => {
  const handleFilterValueChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;

    // Ensure value is always an array
    setFilterValues(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 125 }}>
        <InputLabel htmlFor="filter-value-options">Filter by: </InputLabel>
        <Select
          id="filter-value-options"
          label="filter by"
          multiple
          name="filter-values"
          value={filterValues}
          onChange={handleFilterValueChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(value) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {value.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          <ListSubheader> Recurrence </ListSubheader>
          {recurrenceList.map((recurrence) => (
            <MenuItem key={recurrence} value={recurrence}>
              {recurrence}
            </MenuItem>
          ))}
          <ListSubheader>Category</ListSubheader>
          {categoryList.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterButton;
