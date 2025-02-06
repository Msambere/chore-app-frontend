import { Dispatch, SetStateAction, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions<string>();

interface Props {
  defaultValue?: string;
  options: string[];
  fieldLabel: string;
  setChoreRequestData: Dispatch<SetStateAction<ChoreRequest>>;
}

export default function AutocompleteFormField({
  options,
  fieldLabel,
  setChoreRequestData,
  defaultValue,
}: Props) {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);

  const handleInputChange = (fieldName: string, fieldValue: string | null) => {
    setChoreRequestData((prevState: ChoreRequest) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  return (
    <Autocomplete
      defaultValue={defaultValue}
      value={value}
      onChange={(event, newValue: string | null) => {
        setValue(newValue);
        handleInputChange(fieldLabel, newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
        handleInputChange(fieldLabel, newInputValue);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option);
        if (inputValue !== "" && !isExisting) {
          filtered.push(inputValue);
        }

        return filtered;
      }}
      // selectOnFocus
      // clearOnBlur
      // handleHomeEndKeys
      id={fieldLabel}
      options={options.sort()}
      freeSolo
      renderInput={(params) => (
        <TextField
          required
          margin="normal"
          {...params}
          label={fieldLabel.charAt(0).toUpperCase() + fieldLabel.slice(1)}
        />
      )}
    />
  );
}
