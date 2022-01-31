import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Profile from "./components/profile/profile";
import Integrations from "./components/integrations/integrations";
import Alerts from "./components/alerts/alerts";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { getFontColor } from "../../utils/styleTemplates"
import "./settings.scss";

const AntTabs = withStyles({
    root: {
        borderBottom: "1px solid #e8e8e8",
    },
    indicator: {
        backgroundColor: getFontColor("black"),
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        fontSize: "16px",
        minWidth: 12,
        maxWidth: 100,
        fontWeight: theme.typography.fontWeightBold,
        marginRight: theme.spacing(3),
        fontFamily: ["Avenir-Next"].join(","),
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
}));

function Users() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChangeMenuItem = (_, newValue) => {
        setValue(newValue);
    };
    return (
        <React.Fragment>
            <h1 className="main-header-h1">Settings</h1>
            <div className="settings-panel-body">
                <div className={classes.root}>
                    <div style={{ width: "fit-content" }}>
                        <AntTabs
                            value={value}
                            onChange={handleChangeMenuItem}
                        >
                            <AntTab label="Profile" />
                            <AntTab label="Integrations" />
                            <AntTab label="Alerts" />
                        </AntTabs>
                    </div>
                </div>
            </div>
            <div className="settings-panel-body">
                {value === 0 && <Profile />}
                {value === 1 && <Integrations />}
                {value === 2 && <Alerts />}
            </div>
        </React.Fragment>
    );
}
export default Users;
