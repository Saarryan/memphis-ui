import "./select.scss";
import React from "react";
import {
  getFontColor,
  getBackgroundColor,
  getBorderColor,
  getBoxShadows,
  getBorderRadius,
} from "../../utils/styleTemplates";
import { Select } from "antd";
import Arrow from "../../assets/images/arrow.svg";

const { Option } = Select;

const SelectComponent = (props) => {
  const {
    options = [],
    width,
    onChange,
    colorType,
    value,
    backgroundColorType,
    borderColorType,
    dropdownClassName,
    boxShadowsType,
    radiusType,
    size,
    dropdownStyle,
    height,
    customOptions,
    disabled
  } = props;

  const handleChange = (e) => {
    onChange(e);
  };

  const color = getFontColor(colorType);
  const backgroundColor = getBackgroundColor(backgroundColorType);
  const border = getBorderColor(borderColorType);
  const boxShadow = getBoxShadows(boxShadowsType)
  const borderRadius = getBorderRadius(radiusType);

  const fieldProps = {
    onChange: handleChange,
    disabled,
    style: {
      width,
      color,
      backgroundColor,
      boxShadow,
      border,
      borderRadius,
      height:height||"40px"
    },
  };

  return (
    <div className="select-container">
      <Select
        {...fieldProps}
        className="select"
        size={size}
        dropdownClassName={dropdownClassName}
        value={value}
        suffixIcon={<img src={Arrow} alt="select-arrow" />}
        dropdownStyle={dropdownStyle}
      >
        {customOptions && options}
        {!customOptions && options.map((option) => (
          <Option key={option.id || option} disabled={option.disabled || false}>{option.name || option}</Option>
          ))}
        
      </Select>
    </div>
  );
};

export default SelectComponent;