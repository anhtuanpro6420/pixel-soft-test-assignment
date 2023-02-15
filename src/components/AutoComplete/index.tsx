import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import { Autocomplete, createFilterOptions, FormHelperText, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";

const radioIcon = <RadioButtonUncheckedOutlinedIcon fontSize="small" />;
const radioCheckedIcon = <RadioButtonCheckedOutlinedIcon fontSize="small" />;

export interface IOptions {
  label: string;
  value: string;
}

const filterOptions = createFilterOptions({
  stringify: (option: IOptions) => option.label,
});

export interface FormInputProperties {
  name: string;
  control?: Control<FieldValues, unknown> | undefined;
  label?: string;
  size: "small" | "medium";
  placeholder?: string;
  helperText?: string;
  type?: string;
  fullWidth?: boolean;
  inputAdornments?: unknown;
  disabled?: boolean;
  displayCloseIcon?: boolean;
  onClearInput?: () => void;
}

export interface AutocompleteProperties {
  multiple?: boolean;
  limitTags?: number;
  maxOptions?: number;
  options: IOptions[];
  onChangeTextField?: (event: React.SyntheticEvent) => void;
  onSelectOptions?: (data: IOptions | IOptions[]) => void;
  onBlur?: () => void;
  placeholder?: string;
  disableCloseOnSelect?: boolean;
  selectedOptions?: IOptions[];
}

function MuiAutocomplete({
  name,
  control,
  size,
  label,
  multiple = false,
  limitTags = 3,
  options = [],
  onChangeTextField = () => {},
  onSelectOptions = () => {},
  onBlur = () => {},
  placeholder,
  disableCloseOnSelect = false,
  selectedOptions = [],
}: FormInputProperties & AutocompleteProperties) {
  const isOptionSelected = (option: IOptions) => {
    const selectedOption: IOptions | undefined = selectedOptions.find(
      (selected: IOptions) => selected?.value === option.value
    );
    return !!selectedOption;
  };
  return (
    <>
      <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 2, marginTop: 16 }}>{label}</div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => {
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
                onChange={(event, data) => {
                  onSelectOptions(data as IOptions | IOptions[]);
                  return onChange(data);
                }}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                value={value}
                disablePortal
                id={label}
                options={options}
                style={{ width: "100%" }}
                renderInput={(parameters) => <TextField {...parameters} />}
                filterOptions={filterOptions}
                onBlur={onBlur}
                placeholder={placeholder}
                disableCloseOnSelect={disableCloseOnSelect}
                renderOption={(properties, option) => {
                  return (
                    <li {...properties}>
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
}

MuiAutocomplete.defaultProps = {
  multiple: false,
  limitTags: 3,
  maxOptions: 3,
  onChangeTextField: () => {},
  onSelectOptions: () => {},
  onBlur: () => {},
  disableCloseOnSelect: false,
  selectedOptions: [],
  placeholder: "",
  type: "text",
  fullWidth: true,
  inputAdornments: "",
  disabled: false,
  displayCloseIcon: false,
  control: () => {},
  label: "",
  onClearInput: () => {},
  helperText: "",
};

export default MuiAutocomplete;
