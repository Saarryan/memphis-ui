import './style.scss';

import React, { useEffect, useContext, useState, useRef } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import SearchInput from '../../components/searchInput';
import { Context } from '../../hooks/store';
import UserItem from './userItem';
import Button from '../../components/button';
import { ApiEndpoints } from '../../const/apiEndpoints';
import { httpRequest } from '../../services/http';
import Modal from '../../components/modal';
import CreateUserDetails from './createUserDetails';

function Users() {
    const [state, dispatch] = useContext(Context);
    const [userList, setUsersList] = useState([]);
    const [copyOfUserList, setCopyOfUserList] = useState([]);
    const [addUserModalIsOpen, addUserModalFlip] = useState(false);
    const createUserRef = useRef(null);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'users' });
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        try {
            const data = await httpRequest('GET', ApiEndpoints.GET_ALL_USERS);
            if (data) {
                data.sort((a, b) => new Date(a.creation_date) - new Date(b.creation_date));
                setUsersList(data);
                setCopyOfUserList(data);
            }
        } catch (error) {}
    };

    useEffect(() => {
        if (searchInput.length > 2) {
            const results = userList.filter(
                (userData) => userData?.username?.toLowerCase().includes(searchInput) || userData?.user_type?.toLowerCase().includes(searchInput)
            );
            setUsersList(results);
        } else {
            setUsersList(copyOfUserList);
        }
    }, [searchInput.length > 2]);

    const handleSearch = (e) => {
        setSearchInput(e.target.value);
    };

    const removeUser = async (username) => {
        const updatedUserList = userList.filter((item) => item.username !== username);
        setUsersList(updatedUserList);
        setCopyOfUserList(updatedUserList);
    };

    const closeModal = (userData) => {
        let newUserList = userList;
        newUserList.push(userData);
        setUsersList(newUserList);
        setCopyOfUserList(newUserList);
        addUserModalFlip(false);
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
                    onChange={handleSearch}
                    value={searchInput}
                />
                <Button
                    className="modal-btn"
                    width="160px"
                    height="36px"
                    placeholder={'Add new user'}
                    colorType="purple"
                    radiusType="circle"
                    backgroundColorType="purple"
                    fontSize="14px"
                    fontWeight="600"
                    aria-haspopup="true"
                    onClick={() => addUserModalFlip(true)}
                />
            </div>
            <div className="users-list-container">
                <div className="users-list-header">
                    <p className="user-name-title">Username</p>
                    <p className="type-title">Type</p>
                </div>
                <div className="users-list">
                    {userList.map((user) => {
                        return <UserItem key={user.id} content={user} removeUser={() => removeUser(user.username)} />;
                    })}
                </div>
            </div>
            <Modal
                header="Add new user"
                height="700px"
                minWidth="564px"
                rBtnText="Add"
                lBtnText="Cancel"
                closeAction={() => addUserModalFlip(false)}
                lBtnClick={() => {
                    addUserModalFlip(false);
                }}
                clickOutside={() => addUserModalFlip(false)}
                rBtnClick={() => {
                    createUserRef.current();
                }}
                open={addUserModalIsOpen}
            >
                <CreateUserDetails createUserRef={createUserRef} closeModal={(userData) => closeModal(userData)} />
            </Modal>
        </div>
    );
}
export default Users;
