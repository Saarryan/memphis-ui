import React, { useEffect, useState } from 'react';

function UserType(props) {
    const [fontColor, setFontColor] = useState('#FD79A8');
    const [backgroundColor, setBackgroundColor] = useState('rgba(253, 121, 168, 0.2)');
    useEffect(() => {
        createTypeWrapperStyle(props.userType);
    }, []);

    const createTypeWrapperStyle = (userType) => {
        switch (userType) {
            case 'management':
                setFontColor('#36DEDE');
                setBackgroundColor('rgba(54, 222, 222, 0.2)');
                break;
            case 'application':
                setFontColor('#419FFE');
                setBackgroundColor('rgba(65, 159, 254, 0.2)');
                break;
            default:
                setFontColor('#FD79A8');
                setBackgroundColor('rgba(253, 121, 168, 0.2))');
                break;
        }
    };

    return (
        <div className="user-typep-wrapper" style={{ background: backgroundColor, color: fontColor }}>
            {props.userType}
        </div>
    );
}

export default UserType;
