import React, { memo, useMemo } from "react";
import style from "./Button.module.scss";
import { Button, ButtonProps } from "@mui/material";

type IProp = {
  fixedWidth?: boolean;
  className?: string;
  typebutton?: string;
  customStyles?: any;
};

const MuiButton = ({
  fixedWidth,
  className = "",
  disabled = false,
  customStyles = {},
  ...props
}: ButtonProps & IProp) => {
  const classStyle = useMemo(() => {
    switch (props.typebutton) {
      case "primary":
        return style["button-primary"];
      case "danger":
        return style["button-danger"];
      case "text":
        return style["button-text"];
      case "link":
        return style["button-link"];
      case "filter":
        return style["button-filter"];
      case "header":
        return style["button-header"];

      default:
        return style["button-basic"];
    }
  }, [props.typebutton]);

  return (
    <Button
      {...props}
      disabled={disabled}
      className={`capitalize shadow-none ${className} ${classStyle} ${
        fixedWidth ? style["button-basic"] : ""
      }`}
      style={{ ...customStyles }}
    />
  );
};

export default memo(MuiButton);
