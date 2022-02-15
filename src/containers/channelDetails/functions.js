import React, { useState } from "react";
import FunctionList from "./components/functionList/functionList"
import FunctionDetails from "./components/functionDetails/functionDetails";
import UsedFunctionsList from "./components/usedFunctionsList/usedFunctionsList"
import ConnectToHub from "../../components/connectToHub/connectToHub"
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { getFontColor } from "../../utils/styleTemplates"
import Close from "../../assets/images/close.svg"
import Connect from "../../assets/images/connect.svg"
import Seperator from "../../assets/images/seperator.svg"
import Button from "../../components/button/button";
import "./functions.scss";


const AntTabs = withStyles({
    root: {
        paddingLeft: "30px",
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

function Functions(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [chosenFunction, setChosenFunction] = useState(null);
    const [signedToHub, signInToHub] = useState(false); //placeholder - will be received from state
    const [isOpenSignIn, flipIsOpenSignIn] = useState(false);

    const handleChangeMenuItem = (_, newValue) => {
        setValue(newValue);
    };

    const handleCloseModal = () => {
        props.closeModal(false)
    }

    return (
        <Dialog
            open={props.open}
            onClose={(_, reson) => {
                if (reson === "backdropClick")
                    handleCloseModal()
                // { props.clickOutside() }
            }}
            classes={{ paper: classes.dialogPaper }}
        >
            <ConnectToHub open={isOpenSignIn} closeModeal={e => flipIsOpenSignIn(e)} />
            <div className="functions-modal-header">
                <label className="queue-name">Queue name</label>
                <div>
                    <label className="visit-hub">Visit hub</label>
                    <img src={Seperator} alt="|" width="20" height="20" className="seperator" />
                    {signedToHub ?
                        <>
                            <img src={Connect} alt="connect to hub" width="20" height="20" className="pointer" />
                            <label className="sign-in-hub connected">Connected to hub</label>
                        </>
                        :
                        <label className="sign-in-hub" onClick={() => flipIsOpenSignIn(true)}>Sign in to hub</label>
                    }

                    <img src={Close} alt="close" width="12" height="12" style={{ cursor: "pointer" }} onClick={handleCloseModal} />
                </div>

            </div>

            <DialogContent className={classes.dialogContent}>
                <AntTabs value={value} onChange={handleChangeMenuItem}  >
                    <AntTab label="Private" />
                    <AntTab label="Public" />
                </AntTabs>
                <div className="functions-container">
                    <div className="function-list-section"><FunctionList chooseFunction={(func) => setChosenFunction(func)} /></div>
                    <div className="function-details-section"> <FunctionDetails chosenFunction={chosenFunction} /></div>
                    {/* {value === 0 && <h1>Private</h1>}
                    {value === 1 && <h1>Public</h1>} */}
                </div>
                <UsedFunctionsList/>
                <div className="func-btn-footer">
                    <Button
                        className="modal-btn"
                        width="90px"
                        height="32px"
                        placeholder={"Cancel"}
                        colorType="darkPurple"
                        radiusType="circle"
                        backgroundColorType={"none"}
                        fontSize="14px"
                        fontWeight="bold"
                        aria-haspopup="true"
                    // onClick={() => setOpenFunctionForm(true)}
                    />
                    <Button
                        className="modal-btn"
                        width="90px"
                        height="32px"
                        placeholder={"Add"}
                        colorType="lightPurple"
                        radiusType="circle"
                        backgroundColorType={"darkPurple"}
                        fontSize="14px"
                        fontWeight="bold"
                        aria-haspopup="true"
                    // onClick={() => setOpenFunctionForm(true)}
                    />
                </div>
            </DialogContent>
        </Dialog>);
}
export default Functions;
