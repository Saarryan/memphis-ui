import './searchInput.scss';
import React from 'react';
import { getFontColor, getBackgroundColor, getBorderRadius, getBorderColor,getBoxShadows } from '../../utils/styleTemplates'
import { Input } from 'antd'



const SearchInput = (props) => {
  const {
    placeholder,
    height,
    width,
    colorType,
    backgroundColorType,
    onChange,
    iconComponent,
    borderRadiusType,
    borderBottom,
    borderColorType,
    boxShadowsType
  } = props;

  const handleChange = e => (onChange(e));

  const color = getFontColor(colorType);
  const backgroundColor = getBackgroundColor(backgroundColorType);
  const borderRadius = getBorderRadius(borderRadiusType)
  const padding = 0;
  const borderColor = getBorderColor(borderColorType)
  const boxShadow = getBoxShadows(boxShadowsType)


  const fieldProps = {
    placeholder,
    onChange: handleChange,
    style: { width, height, color, backgroundColor, padding, borderBottom, borderRadius, borderColor, boxShadow },
  };

  return (
    <div className="search-input-container">
      <Input {...fieldProps} bordered={false}
        prefix={<div className="search-icon">{iconComponent}</div>}>
      </Input>

    </div>
  );
};

export default SearchInput;