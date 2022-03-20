import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React from 'react';

import { getFontColor } from '../../utils/styleTemplates';

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8'
    },
    indicator: {
        backgroundColor: getFontColor('black')
    }
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        fontSize: '14px',
        minWidth: 12,
        maxWidth: 100,
        fontWeight: 600,
        marginRight: theme.spacing(3),
        fontFamily: ['Inter'].join(','),
        '&:hover': {
            color: getFontColor('navy'),
            opacity: 1
        },
        '&$selected': {
            color: getFontColor('navy'),
            fontWeight: theme.typography.fontWeightBold
        },
        '&:focus': {
            color: getFontColor('navy')
        }
    },
    selected: {}
}))((props) => <Tab disableRipple {...props} />);

const CustomTabs = (props) => {
    const { tabs, onChange, value } = props;

    return (
        <div>
            <AntTabs value={value} onChange={onChange}>
                {tabs.map((tab, index) => (
                    <AntTab key={index} label={tab} />
                ))}
            </AntTabs>
        </div>
    );
};

export default CustomTabs;
