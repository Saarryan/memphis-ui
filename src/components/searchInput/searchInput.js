import './searchInput.scss';
import React from 'react';
import { getFontColor, getBackgroundColor, getBorderRadius } from '../../utils/styleTemplates'
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
    borderBottom
  } = props;

  const handleChange = e => (onChange(e));

  const color = getFontColor(colorType);
  const backgroundColor = getBackgroundColor(backgroundColorType);
  const padding = 0;
  const borderRadius = getBorderRadius(borderRadiusType)


  const fieldProps = {
    placeholder,
    onChange: handleChange,
    style: { width, height, color, backgroundColor, padding, borderBottom, borderRadius },
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