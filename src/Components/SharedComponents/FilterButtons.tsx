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

function getStyles(
  recurrence: string,
  sortValues: readonly string[],
  theme: Theme,
) {
  return {
    fontWeight: sortValues.includes(recurrence)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

interface Props {
  recurrenceList: string[];
  categoryList: string[];
  setSortOrder: Dispatch<SetStateAction<string>>;
  setSortValues: Dispatch<SetStateAction<string[]>>;
  sortValues: string[];
  sortOrder: string;
}

const SortingButtons = ({
  recurrenceList,
  categoryList,
  setSortOrder,
  setSortValues,
  sortValues,
  sortOrder,
}: Props) => {
  const theme = useTheme();

  const handleSortValueChange = (event) => {
    // setSortValue(event.target.value);
    const {
      target: { value },
    } = event;
    setSortValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
    console.log(sortValues);
  };

  // const handleChange = (event: SelectChangeEvent<typeof personName>) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
    console.log(sortOrder);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 125 }}>
        <InputLabel htmlFor="sort-value-options">Sort by: </InputLabel>
        <Select
          id="sort-value-options"
          label="Sort by"
          multiple
          value={sortValues}
          onChange={handleSortValueChange}
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
              style={getStyles(recurrence, sortValues, theme)}
            >
              {recurrence}
            </MenuItem>
          ))}
          <ListSubheader>Category</ListSubheader>
          {categoryList.map((category) => (
            <MenuItem
              key={category}
              value={category}
              style={getStyles(category, sortValues, theme)}
            >
              {category}
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
