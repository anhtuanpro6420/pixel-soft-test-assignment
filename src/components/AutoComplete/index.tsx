import { FormInputProps } from "@Components/MuiTextField";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { Autocomplete, createFilterOptions, FormHelperText, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import React from "react";
import { Controller } from "react-hook-form";
// import { matchSorter } from "match-sorter";

const radioIcon = <RadioButtonUncheckedOutlinedIcon fontSize="small" />;
const radioCheckedIcon = <RadioButtonCheckedOutlinedIcon fontSize="small" />;

export interface IOptions {
  label: string;
  value: string;
}

const filterOptions = createFilterOptions({
  stringify: (option: IOptions) => option.label,
});

// const filterOptions = (options: IOptions, { inputValue }) => matchSorter(options, inputValue);

export interface AutocompleteProps {
  multiple?: boolean;
  limitTags?: number;
  maxOptions?: number;
  options: IOptions[];
  onChangeTextField?: any;
  onSelectOptions?: any;
  onBlur?: any;
  placeholder?: string;
  disableCloseOnSelect?: boolean;
  selectedOptions?: IOptions[];
}

const MuiAutocomplete: React.FC<FormInputProps & AutocompleteProps> = ({
  name,
  control,
  size,
  label,
  multiple = false,
  limitTags = 3,
  options = [],
  maxOptions = 3,
  onChangeTextField = () => {},
  onSelectOptions = () => {},
  onBlur = () => {},
  placeholder,
  disableCloseOnSelect = false,
  selectedOptions = [],
}) => {
  // const optionLabels = options.map(option => option.label);
  // const filterOptions = (options: any, { inputValue }: any) => matchSorter(options, inputValue);

  const isOptionSelected = (option: IOptions) => {
    const selectedOption: IOptions | undefined = selectedOptions.find(
      (selectedOption: IOptions) => selectedOption?.value === option.value
    );
    return !!selectedOption;
  };
  return (
    <>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, marginTop: 16 }}>{label}</div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error }, formState }) => {
          return (
            <>
              <Autocomplete
                sx={{
                  "& .MuiAutocomplete-tag": {
                    background: "black",
                    color: "white",
                    "& .MuiSvgIcon-root": {
                      color: "white",
                    },
                  },
                }}
                clearIcon={<HighlightOffOutlinedIcon />}
                noOptionsText="No result"
                onInputChange={onChangeTextField}
                size={size}
                getOptionLabel={(option) => option.label}
                multiple={multiple}
                limitTags={limitTags}
                onChange={(e, data) => {
                  onSelectOptions(data);
                  return onChange(data);
                }}
                value={value}
                disablePortal
                id={label}
                options={options}
                style={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} />}
                filterOptions={filterOptions}
                onBlur={onBlur}
                placeholder={placeholder}
                disableCloseOnSelect={disableCloseOnSelect}
                renderOption={(props, option, { selected }) => {
                  return (
                    <li {...props}>
                      <Radio
                        checked={isOptionSelected(option)}
                        icon={radioIcon}
                        checkedIcon={radioCheckedIcon}
                      />
                      {option.label}
                    </li>
                  );
                }}
              />
              {error && <FormHelperText error>{error.message}</FormHelperText>}
            </>
          );
        }}
      />
    </>
  );
};

export default MuiAutocomplete;
