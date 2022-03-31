import './style.scss';

import React, { useEffect, useContext, useState } from 'react';

import FailedFactories from './failedFactories';
import GenericDetails from './genericDetails';
import SysComponents from './sysComponents';
import Throughput from './throughput';
import Resources from './resources';
import { useMediaQuery } from 'react-responsive';
import { Context } from '../../hooks/store';
import { LOCAL_STORAGE_AVATAR_ID, LOCAL_STORAGE_USER_NAME } from '../../const/localStorageConsts';

const Desktop = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 850 });
    return isDesktop ? children : null;
};
const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 849 });
    return isMobile ? children : null;
};

function OverView() {
    const [state, dispatch] = useContext(Context);
    const botId = 1;
    const [botUrl, SetBotUrl] = useState(require('../../assets/images/bots/1.svg'));
    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'overview' });
        setBotImage(state?.userData?.avatar_id || localStorage.getItem(LOCAL_STORAGE_AVATAR_ID));
    }, []);

    const setBotImage = (botId) => {
        SetBotUrl(require(`../../assets/images/bots/${botId}.svg`));
    };

    return (
        <div className="overview-container">
            <Desktop>
                <div className="overview-wrapper">
                    <div className="header">
                        <div className="bot-wrapper">
                            <img src={botUrl} width={40} height={40} alt="bot"></img>
                        </div>
                        <div className="dynamic-sentences">
                            <h1>Welcome Back, {localStorage.getItem(LOCAL_STORAGE_USER_NAME)}</h1>
                            <p className="ok-status">You’re a memphis superhero! All looks good!</p>
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
                            <p className="overview-bold-light">Total usage </p>
                        </div>
                    </div>
                </div>
            </Mobile>
        </div>
    );
}

export default OverView;
