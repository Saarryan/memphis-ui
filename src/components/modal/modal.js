import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "../../components/button/button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import WarningRoundedIcon from "@material-ui/icons/WarningRounded";
import "./modal.scss";

const TransitionsModal = (props) => {
  const {
    height,
    width,
    rBtnText,
    lBtnText,
    rBtnDisabled,
    lBtnDisabled,
    btnPosition,
    header,
    confirm,
    minHeight,
    minWidth,
    progress,
    isLoading,
    warning,
  } = props;

  const useStyles = makeStyles((theme) => ({
    dialogPaper: {
      display: "flex",
      // padding: "10px",
      justifyContent: "center",
      width: width,
      height: height,
      border: warning ? "1px solid #fbbd71" : "1px solid #5D4AEE",
      borderRadius: "4px",
      minWidth: minWidth || "703px",
      minHeight: minHeight,
      overflowX: "hidden",
      overflowY: "scroll",
      position: "relative",
    },
    dialogPaperConfirm: {
      display: "flex",
      justifyContent: "center",
      width: props.width ? props.width : "500px",
      height: props.height ? props.height : "230px",
      minWidth: minWidth || "703px",
      minHeight: minHeight,
      border: warning ? "1px solid #fbbd71" : "1px solid #5D4AEE",
      borderRadius: "4px",
    },
    buttonLoader: {
      color: "#f7f7f7",
      marginTop: "5px",
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = useState(props);

  return confirm ? (
    <Dialog
      onClose={(_, reson) => {
        if (reson === "backdropClick") { props.clickOutside() }
      }}
      open={props.open}
      aria-labelledby="form-dialog-title"
      classes={{ paper: classes.dialogPaperConfirm }}
    >
      <DialogContent
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <span
          style={{
            display: "flex",
          }}
        >
          {warning && (
            <WarningRoundedIcon
              style={{
                fontSize: "30px",
                color: "#fbbd71",
                marginRight: "10px",
              }}
            />
          )}
          <p className="modal-header">{header}</p>
        </span>
        {props.children}
      </DialogContent>
      <DialogActions>
        <div
          style={{
            position: "absolute",
            bottom: "0px",
            right: "10px",
          }}
        >
          <Button
            className="modal-btn"
            width="140px"
            height="40px"
            placeholder="Close"
            colorType="lightPurple"
            radiusType="semi-round"
            backgroundColorType={warning ? "orange" : "darkPurple"}
            fontSize="14px"
            fontWeight="bold"
            onClick={() => {
              props.rBtnClick();
              setOpen(false);
            }}
          />
        </div>
      </DialogActions>
    </Dialog>
  ) : (
    <Dialog
      open={props.open}
      onClose={(_, reson) => {
        if (reson === "backdropClick") { props.clickOutside() }
      }}
      aria-labelledby="form-dialog-title"
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogContent
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      >
        <span
          style={{
            display: "flex",
          }}
        >
          {warning && (
            <WarningRoundedIcon
              style={{
                fontSize: "30px",
                color: "#fbbd71",
                marginRight: "10px",
              }}
            />
          )}
          <p className="modal-header">{header}</p>
        </span>
        {props.children}
      </DialogContent>
      <DialogActions>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            bottom: "0px",
            right: "10px",
          }}
        >
          <div className="btnContainer">
            <Button
              className="modal-btn"
              width="140px"
              height="40px"
              placeholder={lBtnText}
              disabled={lBtnDisabled}
              colorType="navy"
              radiusType="semi-round"
              backgroundColorType="lightPurple"
              fontSize="12px"
              fontWeight="bold"
              onClick={() => {
                props.lBtnClick();
              }}
            />
            <Button
              className="modal-btn"
              width="140px"
              height="40px"
              placeholder={
                progress ? (
                  <CircularProgress
                    size={20}
                    className={classes.buttonLoader}
                  />
                ) : (
                  rBtnText
                )
              }
              disabled={rBtnDisabled}
              colorType="lightPurple"
              radiusType="semi-round"
              backgroundColorType={warning ? "orange" : "darkPurple"}
              fontSize="12px"
              fontWeight="bold"
              isLoading={isLoading}
              onClick={() => {
                props.rBtnClick();
              }}
            />
          </div>
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default TransitionsModal;
