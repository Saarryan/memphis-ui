import React from "react";
import OverflowTip from "../../../../components/tooltip/overflowtip"
import ArrowFunction from "../../../../assets/images/arrowFunction.svg"
import "./usedFunctionsList.scss";

const functions = ["Sentiment analysis ddddddddddsssss", "Sentiment analysis", "Sentiment analysis",
    //  "Sentiment analysis","Sentiment analysis", "Sentiment analysis", "Sentiment analysis", "Sentiment analysis",
    "Sentiment analysis", "Sentiment analysis", "Sentiment analysis", "Sentiment analysis"]

function UsedFunctionsList() {
    return (
        <div className="functions-used-container">
            <p className="factory-name">My factory</p>
            <div className="functions-list">
                {functions?.map((func, index) => {
                    return <React.Fragment key={index}>
                        <div className="function-item" onClick={() => console.log(`edit ${index}`)}>
                            <OverflowTip
                                text="Sentiment analysis ddddddddddsssss"
                                width={"170px"}
                                // color="white"
                                cursor="pointer"
                            >
                                {func}
                            </OverflowTip>
                        </div>
                        <img
                            src={ArrowFunction}
                            alt="arrow"
                            width="45"
                        />
                    </React.Fragment>
                })}
            </div>
        </div>
    );
}
export default UsedFunctionsList;
