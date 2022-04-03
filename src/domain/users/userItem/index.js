import './style.scss';

import React, { useEffect, useState } from 'react';
import UserType from './userType';
import { httpRequest } from '../../../services/http';
import { ApiEndpoints } from '../../../const/apiEndpoints';
import Modal from '../../../components/modal';

function UserItem(props) {
    const defaultBotId = 1;
    const [botUrl, SetBotUrl] = useState(1);
    const [open, modalFlip] = useState(false);

    useEffect(() => {
        setBotImage(props.content?.avatar_id || defaultBotId);
    }, []);

    const setBotImage = (botId) => {
        SetBotUrl(require(`../../../assets/images/bots/${botId}.svg`));
    };

    const removeUser = async (username) => {
        try {
            await httpRequest('DELETE', ApiEndpoints.REMOVE_USER, {
                username: username
            });
            props.removeUser();
        } catch (error) {}
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
            {props.content?.user_type !== 'root' && (
                <div className="user-actions">
                    {/* <p>Generate password</p> */}
                    <p onClick={() => modalFlip(true)}>Delete user</p>
                </div>
            )}
            <Modal
                header="Remove user"
                height="220px"
                minWidth="440px"
                rBtnText="Cancel"
                lBtnText="Remove"
                closeAction={() => modalFlip(false)}
                lBtnClick={() => {
                    removeUser(props.content?.username);
                }}
                clickOutside={() => modalFlip(false)}
                rBtnClick={() => modalFlip(false)}
                open={open}
            >
                <label>Are you sure you want to delete {props.content?.username}?</label>
                <br />
            </Modal>
        </div>
    );
}
export default UserItem;
