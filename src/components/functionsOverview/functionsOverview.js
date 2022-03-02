import "./functionsOverview.scss";
import React, { useState, useContext, useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowRightAltSharpIcon from "@material-ui/icons/ArrowRightAltSharp";
import removeFunctionIcon from "../../assets/images/removeFunctionIcon.svg"
import arrowFunction from "../../assets/images/arrowFunction.svg"
import OverflowTip from "../tooltip/overflowtip";
const FunctionsOverview = (props) => {

    const {
        functions,
        horizontal,
        editable
    } = props;

    const handleRemoveFunction = (funcIndex) => {
    };
    const handleEditFunction = (funcIndex, func) => {
    };

    return (
        <div className={horizontal ? "function-overview-container horizontal" : "function-overview-container"}>
            {functions.map((func, index) => {
                return (
                    <div className={horizontal ? "function-list-container horizontal" : "function-list-container"} key={index}>
                        <div className="func-wrapper">
                            {editable &&
                                <div
                                    className="remove-button"
                                    onClick={() => handleRemoveFunction(index)}
                                >
                                    <img
                                        src={removeFunctionIcon}
                                        alt="edit"
                                        width="8px"
                                        height="8px"
                                    />
                                </div>
                            }
                            <div
                                className={horizontal ? "function-box-overview horizontal" : "function-box-overview"}
                                onClick={() => handleEditFunction(index + 1, func)}
                            >
                                <div className="function-name">
                                    {/* {removing === index ? (
                                    <CircularProgress
                                        size={20}
                                        className="circular-progress"
                                    />
                                    ) : ( */}
                                    <OverflowTip
                                        text={func.name}
                                        width={"7vw"}
                                        cursor="pointer"
                                    >
                                        {func.name}
                                    </OverflowTip>

                                </div>
                            </div>
                        </div>
                        {index < functions?.length - 1 && (
                            <img
                                src={arrowFunction}
                                alt="edit"
                                width="4vw"
                                style={{ transform: !horizontal && "rotate(90deg)", margin: "15px" }}
                            />
                        )}
                    </div>
                );
            })
            }
        </div>

    );
}

export default FunctionsOverview;