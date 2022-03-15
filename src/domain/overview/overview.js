import "./overview.scss";
import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../hooks/store";
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
  const botId = 1;
  const [botUrl, SetBotUrl] = useState(require('../../assets/images/bots/1.svg'))
  useEffect(() => {
    dispatch({ type: "SET_ROUTE", payload: "overview" });
    setBotImage(botId);
  }, []);

  const setBotImage = (botId) => {
    SetBotUrl(require(`../../assets/images/bots/${botId}.svg`))
  }



  return (
    <div className="overview-container">
      <Desktop>
        <div className="overview-wrapper">
          <div className="header">
            <div className="bot-wrapper">
              <img src={botUrl} width={30} height={30} alt="bot"></img>
            </div>
            <div className="dynamic-sentences">
              <h1>Welcome Back, Alex</h1>
              <p className="ok-status">You’re a memphis superhero! All looking good!</p>
            </div>
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
