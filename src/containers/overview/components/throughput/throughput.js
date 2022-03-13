import './throughput.scss'
import React, { useState } from 'react'
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { getFontColor } from "../../../../utils/styleTemplates"
import ApexChart from './areaChart'


const AntTabs = withStyles({
    root: {
        position: "absolute",
        top: "5px",
        left: "40%",
    },
    indicator: {
        backgroundColor: getFontColor("black"),

    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        fontSize: "14px",
        minWidth: 12,
        maxWidth: 100,
        fontWeight: theme.typography.fontWeightBold,
        marginRight: theme.spacing(3),
        fontFamily: ["Inter"].join(","),
        "&:hover": {
            color: getFontColor("navy"),
            opacity: 1,
        },
        "&$selected": {
            color: getFontColor("navy"),
            fontWeight: theme.typography.fontWeightBold,
        },
        "&:focus": {
            color: getFontColor("navy"),
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    dialogPaper: {
        height: "100vh",
        width: "100vw",
        borderRadius: "10px",
        minWidth: "1400px",
        overflowX: "hidden",
        overflowY: "scroll",
        position: "relative",
    },
    dialogContent: {
        width: "100%",
        height: "100%",
        padding: "0px"
    }

}));

const Throughput = () => {

    const [value, setValue] = useState(0);

    const handleChangeMenuItem = (_, newValue) => {
        setValue(newValue);
    };

    return (
        <div className='dashboard-wrapper throughput-dashboard-container'>
            <AntTabs value={value} onChange={handleChangeMenuItem}  >
                <AntTab label="Subscribers" />
                <AntTab label="Publishers" />
            </AntTabs>
            <p className='dashboard-components-header'>Throughput</p>
            <ApexChart />
        </div>
    );
}

export default Throughput;