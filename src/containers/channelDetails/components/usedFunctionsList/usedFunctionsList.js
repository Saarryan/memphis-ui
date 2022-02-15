import React from "react";
import ArrowFunction from "../../../../assets/images/arrowFunction.svg"
import "./usedFunctionsList.scss";

const functions = ["Sentiment analysis", "Sentiment analysis", "Sentiment analysis",
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
                            <p>{func}</p>
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
