import "./overview.scss";
import React, { useEffect, useContext } from "react";
import { Context } from "../../hooks/store";
import { Divider } from "@material-ui/core";
import { useMediaQuery } from 'react-responsive'
import GenericDetails from "./components/genericDetails/genericDetails";
import Throughput from "./components/throughput/throughput";
import FailedFactories from "./components/failedFactories/failedFactories";
import Resources from "./components/resources/resources";
import SysComponents from "./components/sysComponents/sysComponents";

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
    <div className="overview-container">
      <Desktop>
        <div className="overview-wrapper">
          <div className="header">
            <p>Welcome Back, Alex</p>
          </div>
          <div className="overview-components">
            <div className="left-side">
              <GenericDetails />
              <Throughput />
              <FailedFactories />
            </div>
            <div className="right-side">
              <Resources />
              <SysComponents />
            </div>
          </div>
        </div>
      </Desktop>
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
  );
}

export default OverView;
