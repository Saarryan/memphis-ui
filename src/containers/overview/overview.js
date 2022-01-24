import "./overview.scss";
import React, { useEffect, useContext } from "react";
import { Context } from "../../hooks/store";
import { Divider } from "@material-ui/core";
import { useMediaQuery } from 'react-responsive'

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 850 });
  return isDesktop ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 849 })
  return isMobile ? children : null
}

function OverView() {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    dispatch({ type: "SET_ROUTE", payload: "overview" });
    dispatch({ type: "SHOW_PANEL", payload: true });
    dispatch({
      type: "IS_USECASE_BUILDER_ACTIVE",
      payload: false,
    });
  }, []);

  return (
    <React.Fragment>
      <div className="overview-container">
        <Desktop>
          <h1 className="main-header-h1">
            Overview
          </h1>
          <div className="overview">
            <div id="overview-panel-container-up">
              <div id="overview-monthly-usage" className="overview-panels">
                <p className="overview-bold-light">
                  Total usage{" "}
                </p>
              </div>
            </div>
          </div >
        </Desktop >
        <Mobile>
          <div className="overview-mobile">
            <div id="overview-panel-container-up-mobile">
              <div id="overview-monthly-usage-mobile" className="overview-panels">
                <p className="overview-bold-light">
                  Total usage{" "}
                </p>
              </div>
            </div>
          </div >
        </Mobile >
      </div >
    </React.Fragment >
  );
}

export default OverView;
