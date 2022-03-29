import './style.scss';

import React from 'react';

import Input from '../../../components/Input';
import ImgLoader from './imgLoader';

function Profile() {
    return (
        <div className="profile-container">
            {/* <div className="profile-border-logo"> */}
            <ImgLoader />
            {/* </div> */}
            <div className="user-name">
                <p>User</p>
                <Input
                    disabled={true}
                    placeholder="usernmane"
                    type="text"
                    radiusType="semi-round"
                    borderColorType="none"
                    boxShadowsType="gray"
                    colorType="black"
                    backgroundColorType="white"
                    width="200px"
                    height="40px"
                    iconComponent=""
                    onChange={() => {}}
                />
            </div>
        </div>
    );
}

export default Profile;
