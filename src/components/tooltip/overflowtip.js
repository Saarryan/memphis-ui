import React, { useRef, useEffect, useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles } from "@material-ui/core/styles";

const OverflowTip = (props) => {
  const tooltipStyle = makeStyles((theme) => ({
    tooltip: {
      color: props.color === "white" ? "#2B2E3F" : "#f7f7f7",
      backgroundColor: props.color === "white" ? "#f7f7f7" : "#2B2E3F",
      fontSize: "14px",
      fontWeight: 800,
      margin: "5px",
      fontFamily: "Avenir-Next",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      whiteSpace: "pre-line",
    },
    arrow: {
      color: props.color === "white" ? "#f7f7f7" : "#2B2E3F",
    },
  }));
  const classes = tooltipStyle();
  // Create Ref
  const textElementRef = useRef();

  const compareSize = () => {
    const compare =
      textElementRef.current.scrollWidth > textElementRef.current.clientWidth;
    setHover(compare);
  };

  // compare once and add resize listener on "componentDidMount"
  useEffect(() => {
    compareSize();
    window.addEventListener("resize", compareSize);
    return () => {
      window.removeEventListener("resize", compareSize);
    }
  }, []);

  // Define state and function to update the value
  const [hoverStatus, setHover] = useState(false);

  return (
    <Tooltip
      title={props.text}
      interactive
      disableHoverListener={!hoverStatus}
      classes={classes}
      arrow
    >
      <div
        ref={textElementRef}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: props.width || null,
          cursor: props.cursor || "default",
          textAlign: props.textAlign || null,
        }}
      >
        {props.children}
      </div>
    </Tooltip>
  );
};

export default OverflowTip;
