import './style.scss';

import React, { useEffect, useState } from 'react';
import UserType from './userType';

function UserItem(props) {
    const botId = 1;
    const [botUrl, SetBotUrl] = useState();

    useEffect(() => {
        setBotImage(props.content?.avatar_id || botId);
    }, []);

    const setBotImage = (botId) => {
        SetBotUrl(require(`../../../assets/images/bots/${botId}.svg`));
    };
    return (
        <div className="users-item">
            <div className="user-name">
                <div className="user-avatar">
                    <img src={botUrl} width={25} height={25} alt="bot"></img>
                </div>
                {props.content?.username}
            </div>
            <div className="user-type">
                <UserType userType={props.content?.user_type} />
            </div>
            <div className="user-actions">
                <p>Generate password</p>
                <p>Delete user</p>
            </div>
        </div>
    );
}
export default UserItem;
