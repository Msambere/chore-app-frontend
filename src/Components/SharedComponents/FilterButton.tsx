import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { Dispatch, SetStateAction } from "react";
import { Box, Chip, ListSubheader, OutlinedInput } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";

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

// function getStyles(
//   recurrence: string,
//   filterValues: readonly string[],
//   theme: Theme,
// ) {
//   return {
//     fontWeight: filterValues.includes(recurrence)
//       ? theme.typography.fontWeightMedium
//       : theme.typography.fontWeightRegular,
//   };
// }

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
  const theme = useTheme();

  const handlefilterValueChange = (event) => {
    // setSortValue(event.target.value);
    const {
      target: { value },
    } = event;
    setFilterValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
    console.log(filterValues);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 125 }}>
        <InputLabel htmlFor="filter-value-options">Filter by: </InputLabel>
        <Select
          id="filter-value-options"
          label="filter by"
          multiple
          value={filterValues}
          onChange={handlefilterValueChange}
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
            <MenuItem
              key={recurrence}
              value={recurrence}
              // style={getStyles(recurrence, sortValues, theme)}
            >
              {recurrence}
            </MenuItem>
          ))}
          <ListSubheader>Category</ListSubheader>
          {categoryList.map((category) => (
            <MenuItem
              key={category}
              value={category}
              // style={getStyles(category, sortValues, theme)}
            >
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterButton;
