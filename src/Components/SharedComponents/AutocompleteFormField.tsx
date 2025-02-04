import {useState} from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions<string>();

interface Props{
  options: string[];
}

export default function AutocompleteFormField({options}: Props, fieldLabel:string) {
  const [value, setValue] = useState<string | null>("Any");

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          setValue(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue(newValue.inputValue);
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id={fieldLabel}
      options={options}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label={fieldlabel} />
      )}
    />
  );
};



