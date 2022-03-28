import './style.scss';

import React, { useEffect, useContext, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import SearchInput from '../../components/searchInput';
import { Context } from '../../hooks/store';
import UserItem from './userItem';
import Button from '../../components/button';
import { ApiEndpoints } from '../../const/apiEndpoints';
import { httpRequest } from '../../services/http';

function Users() {
    const [state, dispatch] = useContext(Context);
    const [userList, setUsersList] = useState([]);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'users' });
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const data = await httpRequest('GET', ApiEndpoints.GET_ALL_USERS);
            if (data) {
                setUsersList(data);
            }
        } catch (error) {}
    };

    const removeUser = (id) => {
        setUsersList(userList.filter((item) => item.id !== id));
    };

    return (
        <div className="users-container">
            <h1 className="main-header-h1">Users</h1>
            <div className="add-search-user">
                <SearchInput
                    placeholder="Search here"
                    colorType="navy"
                    backgroundColorType="none"
                    width="10vw"
                    height="27px"
                    borderRadiusType="circle"
                    borderColorType="gray"
                    boxShadowsType="gray"
                    iconComponent={<SearchOutlined />}
                    //   onChange={handleSearch}
                    //   value={searchInput}
                />
                <Button
                    className="modal-btn"
                    width="160px"
                    height="36px"
                    placeholder={'Create new factory'}
                    colorType="lightPurple"
                    radiusType="circle"
                    backgroundColorType="darkPurple"
                    fontSize="14px"
                    fontWeight="600"
                    aria-haspopup="true"
                    //onClick={() => modalFlip(true)}
                />
            </div>
            <div className="users-list-container">
                <div className="users-list-header">
                    <p className="user-name-title">Username</p>
                    <p className="type-title">Type</p>
                </div>
                <div className="users-list">
                    {userList.map((user) => {
                        return <UserItem key={user.id} content={user} removeUser={() => removeUser(user.id)} />;
                    })}
                </div>
            </div>
        </div>
    );
}
export default Users;
