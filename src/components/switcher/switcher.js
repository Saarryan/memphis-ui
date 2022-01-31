import React from "react";
import { Switch } from 'antd';

const Switcher = (props) => {

    const {
        checkedChildren,
        unCheckedChildren,
        onChange,
        checked,
        disabled
    } = props

    const fieldProps = {
        disabled
    }
    return (
        <div className="switch-button">
            <Switch {...fieldProps} className="test" onChange={(e)=> onChange(e)} checked={checked} checkedChildren={checkedChildren} unCheckedChildren={unCheckedChildren} />
        </div>
    )      
    
};
export default Switcher;