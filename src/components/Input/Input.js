import React from "react";
import "./Input.scss";
import {
  getBorderRadius,
  getFontColor,
  getBackgroundColor,
  getBorderColor,
  getBoxShadows,
} from "../../utils/styleTemplates";
import { Input as InputDesign } from "antd";

const Input = (props) => {
  const {
    placeholder,
    type,
    height,
    width,
    radiusType,
    colorType,
    backgroundColorType,
    onBlur,
    onChange,
    iconComponent,
    borderColorType,
    boxShadowsType,
    disabled,
    numberOfRows,
    value,
    opacity,
    id,
    minWidth,
    fontSize
  } = props;

  const handleBlurChange = (e) => (onBlur ? onBlur(e) : "");
  const handleChange = (e) => (onChange ? onChange(e) : "");

  const { TextArea } = InputDesign;

  const borderRadius = getBorderRadius(radiusType);
  const color = getFontColor(colorType);
  const backgroundColor = getBackgroundColor(backgroundColorType);
  const borderColor = getBorderColor(borderColorType);
  const boxShadow = getBoxShadows(boxShadowsType);
  const rows = numberOfRows ? Number(numberOfRows) : 1;

  const fieldProps = {
    type,
    placeholder,
    onBlur: handleBlurChange,
    onChange: handleChange,
    id,
    style: {
      width,
      height,
      borderRadius,
      color,
      backgroundColor,
      borderColor,
      boxShadow,
      resize: "none",
      opacity,
      minWidth: minWidth || "100px",
      fontSize: fontSize || "16px",
    },
    disabled,
    value,
  };
  const suffix =
    iconComponent !== undefined ? (
      <div className="icon">{iconComponent}</div>
    ) : (
      <span />
    );

  return (
    <div className="input-component-container">
      {type === "textArea" ? (
        <div className="textarea-container">
          <TextArea
            {...fieldProps}
            autoSize={{ minRows: rows, maxRows: rows }}
          />
        </div>
      ) : (
        <div className="input-container">
          {type === "password" && (
            <InputDesign.Password
              {...fieldProps}
              prefix={suffix}
            ></InputDesign.Password>
          )}
          {(type === "text" || type === "email" || type === "number") &&
            iconComponent !== undefined && (
              <InputDesign {...fieldProps} prefix={suffix}></InputDesign>
            )}
          {(type === "text" || type === "email" || type === "number") &&
            iconComponent === undefined && (
              <InputDesign {...fieldProps}></InputDesign>
            )}
        </div>
      )}
    </div>
  );
};

export default Input;
