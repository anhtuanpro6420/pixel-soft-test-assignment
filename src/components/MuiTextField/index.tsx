import React from "react";
import { Controller } from "react-hook-form";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./MuiTextField.module.scss";

export interface FormInputProps {
  name: string;
  control?: any;
  label?: string;
  setValue?: any;
  size: "small" | "medium";
  placeholder?: string;
  helperText?: string;
  type?: string;
  fullWidth?: boolean;
  inputAdornments?: any;
  disabled?: boolean;
  maxLength?: number;
  displayCloseIcon?: boolean;
  inputStyle?: any;
  onClearInput?: () => void;
}

const MuiTextField = ({
  name,
  control,
  label,
  size,
  placeholder = "",
  helperText = "",
  type = "text",
  fullWidth = true,
  inputAdornments = "",
  disabled = false,
  maxLength,
  displayCloseIcon = false,
  inputStyle,
  onClearInput,
}: FormInputProps) => {
  const useStylesInput = makeStyles(() => ({
    notchedOutline: {
      border: "1px solid #8C8C8C",
      borderRadius: 8,
    },
  }));
  const useStylesHelperText = makeStyles(() => ({
    root: {
      marginLeft: 0,
    },
  }));
  const classesInput = useStylesInput();
  const classesHelperText = useStylesHelperText();

  let inputProps: any = {
    classes: {
      notchedOutline: classesInput.notchedOutline,
    },
    endAdornment: displayCloseIcon && (
      <InputAdornment position="end">
        <IconButton onClick={onClearInput} edge="end">
          <CloseIcon />
        </IconButton>
      </InputAdornment>
    ),
  };
  if (inputAdornments)
    inputProps = {
      classes: {
        notchedOutline: classesInput.notchedOutline,
      },
      ...inputAdornments,
    };
  return (
    <div className={styles["custom-input-container"]}>
      <div className={styles["input-label"]}>{label}</div>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error }, formState }) => {
          return (
            <TextField
              type={type}
              helperText={error ? error.message : helperText}
              size={size}
              error={!!error}
              onChange={onChange}
              value={value}
              fullWidth={fullWidth}
              placeholder={placeholder}
              variant="outlined"
              InputLabelProps={{ shrink: false }}
              InputProps={inputProps}
              inputProps={{
                maxLength: maxLength,
                style: inputStyle,
              }}
              FormHelperTextProps={{
                classes: {
                  root: classesHelperText.root,
                },
              }}
              disabled={disabled}
              className="input"
            />
          );
        }}
      />
    </div>
  );
};

export default MuiTextField;
