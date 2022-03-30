import './style.scss';

import React, { useEffect, useContext, useState } from 'react';

import Input from '../../../components/Input';
import Button from '../../../components/button'
import ImgLoader from './imgLoader';
import { Context } from '../../../hooks/store';
import { LOCAL_STORAGE_USER_NAME } from '../../../const/localStorageConsts';
import { LOCAL_STORAGE_AVATAR_ID } from '../../../const/localStorageConsts';
import Bot1 from '../../../assets/images/bots/1.svg'
import Bot2 from '../../../assets/images/bots/2.svg'
import Bot3 from '../../../assets/images/bots/3.svg'
import Bot4 from '../../../assets/images/bots/4.svg'
import Warning from '../../../assets/images/warning.svg'
import pathContainers from '../../../router';
import { httpRequest } from '../../../services/http';
import { ApiEndpoints } from '../../../const/apiEndpoints';
import Modal from '../../../components/modal'

function Profile() {
    const [userName, setUserName] = useState("");
    const [state, dispatch] = useContext(Context);
    const [avatar, setAvatar] = useState("1");
    const [open, modalFlip] = useState(false);

    useEffect(() => {
        setUserName(localStorage.getItem(LOCAL_STORAGE_USER_NAME))
        setAvatar(localStorage.getItem(LOCAL_STORAGE_AVATAR_ID))
    }, []);

    const removeMyUser = async () => {
        try {
            await httpRequest('DELETE', `${ApiEndpoints.REMOVE_MY_UER}`);
            modalFlip(false)
            localStorage.clear();
            window.location.assign(pathContainers.login);
        } catch (err) {
            return;
        }
    };

    const editAvatar = async (avatarId) => {
        try {
            const data = await httpRequest('PUT', `${ApiEndpoints.EDIT_AVATAR}`,{"avatar_id": avatarId});
            setAvatar(data.avatar_id.toString())
            localStorage.setItem(LOCAL_STORAGE_AVATAR_ID, data.avatar_id.toString());
        } catch (err) {
            return;
        }
    };

    return (
        <div className="profile-container">
            <Modal
                header="Remove user"
                height="220px"
                minWidth="440px"
                rBtnText="Cancel"
                lBtnText="Remove"
                closeAction={() => modalFlip(false)}
                lBtnClick={() => {
                    removeMyUser()
                }}
                clickOutside={() => modalFlip(false)}
                rBtnClick={() => modalFlip(false)}
                open={open}
            >
                <label>Are you sure you want to remove user?</label>
                <br />
                <label>Please note that this action is irreversible.</label>
            </Modal>
            <div className="profile-sections">
                <p>Company logo</p>
                <ImgLoader />
            </div>
            <div className="profile-sections">
                <p>Select your avatar</p>
                <div className="avatar-section">
                    <div className={avatar === "1" ? "sub-icon-wrapper sub-icon-wrapper-border" : "sub-icon-wrapper"} onClick={()=>editAvatar(1)}>
                        <img src={Bot1} width={25} height={25} alt="bot1"></img>
                    </div>
                    <div className={avatar === "2" ? "sub-icon-wrapper sub-icon-wrapper-border" : "sub-icon-wrapper"} onClick={()=>editAvatar(2)}>
                        <img src={Bot2} width={25} height={25} alt="bot2"></img>
                    </div>
                    <div className={avatar === "3" ? "sub-icon-wrapper sub-icon-wrapper-border" : "sub-icon-wrapper"} onClick={()=>editAvatar(3)}>
                        <img src={Bot3} width={25} height={25} alt="bot3"></img>
                    </div>
                    <div className={avatar === "4" ? "sub-icon-wrapper sub-icon-wrapper-border" : "sub-icon-wrapper"} onClick={()=>editAvatar(4)}>
                        <img src={Bot4} width={25} height={25} alt="bot4"></img>
                    </div>
                </div>
            </div>
            <div className="profile-sections">
                <p>Username</p>
                <Input
                    disabled={true}
                    value={userName}
                    placeholder="usernmane"
                    type="text"
                    radiusType="semi-round"
                    borderColorType="none"
                    boxShadowsType="gray"
                    colorType="black"
                    backgroundColorType="white"
                    width="350px"
                    height="40px"
                    iconComponent=""
                    onChange={() => { }}
                />
            </div>
            <div className="profile-sections">
                <p>Remove user</p>
                <div className='warning'>
                    <img src={Warning} width={16} height={16} alt="warning"></img>
                    <p>Please note that this action is irreversible</p>
                </div>
                <Button
                    className="modal-btn"
                    width="160px"
                    height="36px"
                    placeholder={'Remove user'}
                    colorType="lightPurple"
                    radiusType="circle"
                    backgroundColorType="darkPurple"
                    fontSize="14px"
                    fontWeight="600"
                    aria-haspopup="true"
                    onClick={() => modalFlip(true)}
                />
            </div>
        </div>
    );
}

export default Profile;
