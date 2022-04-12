import './style.scss';

import { Button as ButtonDesign } from 'antd';
import React from 'react';

import { getBorderRadius, getFontColor, getBackgroundColor, getBoxShadows } from '../../utils/styleTemplates';

const Button = (props) => {
    const {
        width,
        height,
        placeholder,
        radiusType,
        colorType,
        onClick,
        backgroundColorType,
        fontSize,
        fontWeight,
        disabled,
        margin,
        isLoading,
        padding,
        textAlign,
        minWidth,
        marginBottom,
        boxShadowStyle,
        minHeight,
        zIndex,
        border
    } = props;

    const handleClick = (e) => {
        onClick(e);
    };

    const borderRadius = getBorderRadius(radiusType);
    const color = getFontColor(colorType);
    const backgroundColor = getBackgroundColor(backgroundColorType);
    const borderColor = border ? getBackgroundColor(border) : backgroundColor;
    const opacity = disabled ? '0.5' : '1';
    const boxShadow = getBoxShadows(boxShadowStyle);

    const styleButtonContainer = { margin: margin, textAlign: textAlign, marginBottom: marginBottom || null };

    const fieldProps = {
        onClick: handleClick,
        disabled,
        style: {
            borderRadius,
            color,
            backgroundColor,
            width,
            height,
            borderColor,
            fontSize,
            fontWeight,
            opacity,
            minHeight: minHeight,
            minWidth: minWidth || '60px',
            padding,
            zIndex: zIndex,
            display: 'block',
            justifyItems: 'center',
            alignItems: 'center',
            boxShadow,
            alignContent: 'center',
            position: 'relative'
        },
        loading: isLoading
    };

    return (
        <div className="button-container" style={styleButtonContainer}>
            <ButtonDesign {...fieldProps} type="primary" htmlType="submit">
                {placeholder}
            </ButtonDesign>
        </div>
    );
};

export default Button;
