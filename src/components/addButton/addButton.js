// import './addUserButton.scss';
import React from 'react';
import { Button } from 'antd';
import { getFontColor, getBackgroundColor } from '../../utils/styleTemplates';

const AddButton = (props) => {
    const {
        width,
        height,
        placeholder,
        colorType,
        onClick,
        backgroundColorType,
        fontSize,
        fontWeight,
        disabled
    } = props;

    const handleClick = (e) => {
        onClick(e);
    };

    const color = getFontColor(colorType);
    const backgroundColor = getBackgroundColor(backgroundColorType);
    const borderColor = backgroundColor;
    const padding = 0;
    const borderRadius = '12px';
    const boxShadow = '0px 1px 3px 0px rgba(0, 0, 0, 0.5)';
    const opacity = disabled ? '0.5' : '1';

    const fieldProps = {
        onClick: handleClick,
        disabled,
        style: {
            color,
            backgroundColor,
            opacity,
            width,
            height,
            borderColor,
            fontSize,
            fontWeight,
            padding,
            boxShadow,
            borderRadius
        }
    };

    return (
        <div className="button-container">
            <Button {...fieldProps} type="primary" htmlType="submit">
                {placeholder}
            </Button>
        </div>
    );
};

export default AddButton;
