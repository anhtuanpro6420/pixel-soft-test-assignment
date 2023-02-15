import React, { memo, useMemo } from "react";
import { Button, ButtonProps } from "@mui/material";
import style from "./Button.module.scss";

type IProperty = {
  fixedWidth?: boolean;
  className?: string;
  typebutton?: string;
  customStyles?: Record<string, unknown>;
};

function MuiButton({
  fixedWidth,
  className = "",
  disabled = false,
  customStyles = {},
  ...properties
}: ButtonProps & IProperty) {
  const classStyle = useMemo(() => {
    switch (properties.typebutton) {
      case "primary": {
        return style["button-primary"];
      }
      case "danger": {
        return style["button-danger"];
      }
      case "text": {
        return style["button-text"];
      }
      case "link": {
        return style["button-link"];
      }
      case "filter": {
        return style["button-filter"];
      }
      case "header": {
        return style["button-header"];
      }

      default: {
        return style["button-basic"];
      }
    }
  }, [properties.typebutton]);

  return (
    <Button
      {...properties}
      disabled={disabled}
      className={`capitalize shadow-none ${className} ${classStyle} ${
        fixedWidth ? style["button-basic"] : ""
      }`}
      style={{ ...customStyles }}
    />
  );
}

MuiButton.defaultProps = {
  fixedWidth: false,
  typebutton: "",
  className: "",
  customStyles: {},
};

export default memo(MuiButton);
