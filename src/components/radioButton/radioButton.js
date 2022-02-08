import "./radioButton.scss";
import React from "react";
import { Radio } from 'antd';


const RadioButton = (props) => {
  const {
    options = [],
    radioValue,
    onChange,
  } = props;

  const handleChange = (e) => {
    onChange(e);
  };


  const fieldProps = {
    onChange: handleChange,
    value: radioValue,
    options: options
  }

  return (
    <div className="radio-button">
      <Radio.Group {...fieldProps} className="radio-group">
        {/* {options.map((option) => (
          <Radio key={option.id} value={option.content}>{option.content}</Radio>
        ))} */}
      </Radio.Group>
    </div>
  );
};

export default RadioButton;
