import './style.scss';

import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

import animationData from '../../../assets/lotties/thunnel-many.json';
import QueueOverview from './queueOverview';
import PubSubList from './pubSubList';

const QueueObservabilty = () => {
    const anime = useRef(null);
    const anime1 = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: anime.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });
        lottie.loadAnimation({
            container: anime1.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData
        });
    }, []);

    return (
        <div className="queue-observabilty-container">
            <div className="pub-list">
                <PubSubList publishers={true} />
            </div>
            <div className="thunnel-from-sub">
                <div style={{ height: '9vw', width: '9vw' }} ref={anime}></div>
            </div>
            <div className="qeueu-overview">
                <QueueOverview />
            </div>
            <div className="thunnel-to-pub">
                <div style={{ height: '9vw', width: '9vw' }} ref={anime1}></div>
            </div>
            <div className="sub-list">
                <PubSubList publishers={false} />
            </div>
        </div>
    );
};

export default QueueObservabilty;
