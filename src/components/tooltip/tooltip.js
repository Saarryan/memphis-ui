import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import Tooltip from "@material-ui/core/Tooltip";

const TooltipComponent = (props) => {
  const tooltipStyle = makeStyles((theme) => ({
    tooltip: {
      color: props.color === "white" ? "#2B2E3F" : "#f7f7f7",
      backgroundColor: props.color === "white" ? "#f7f7f7" : "#2B2E3F",
      fontSize: "14px",
      fontWeight: 800,
      margin: "5px",
      fontFamily: "Avenir-Next",
      // textAlign: "center",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      whiteSpace: "pre-line",
    },
    arrow: {
      color: props.color === "white" ? "#f7f7f7" : "#2B2E3F",
    },
  }));
  const classes = tooltipStyle();
  const { text } = props;

  return (
    <Tooltip
      TransitionComponent={Zoom}
      title={text ? text : ""}
      classes={classes}
      arrow
    >
      {props.children}
    </Tooltip>
  );
};

export default TooltipComponent;
