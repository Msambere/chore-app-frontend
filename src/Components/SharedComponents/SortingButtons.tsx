import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { Dispatch, SetStateAction } from "react";
import {OutlinedInput} from "@mui/material";


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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}


interface Props {
  recurrenceList: string[];
  categoryList: string[];
  setSortOrder: Dispatch<SetStateAction<string>>;
  setSortValue: Dispatch<SetStateAction<string>>;
  sortValue: string[];
  sortOrder: string;
}

const SortingButtons = ({recurrenceList, categoryList, setSortOrder, setSortValue, sortValue, sortOrder}: Props) => {

  const recurrenceOptions = recurrenceList.map((recurrence:string) => {
    return (
      <option key={recurrence} value={recurrence}>{recurrence}</option>
    );
  });

  const categoryOptions = categoryList.map((category:string) => {
    return (
      <option key={category} value={category}>{category}</option>
    );
  });

  const handleSortValueChange = (event) => {
    setSortValue(event.target.value);
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
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel htmlFor="sort-value-options">Sort by: </InputLabel>
        <Select
          multiple
          value={sortValue}
          onChange={handleSortValueChange}
          defaultValue=""
          id="sort-value-options"
          label="Sort by"
          input={<OutlinedInput label="Sort by" />}
        >
          <option aria-label="None" value="" />
          <option value="alphabetically">Alphabetically</option>
          <optgroup label="Recurrence">
            {recurrenceOptions}
          </optgroup>
          <optgroup label="Category">
            {categoryOptions}
          </optgroup>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
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
}

export default SortingButtons;