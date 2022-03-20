import './style.scss';

import React, { useEffect, useContext } from 'react';
import { SearchOutlined } from '@ant-design/icons';

import SearchInput from '../../components/searchInput';
import AddButton from '../../components/addButton';
import { Context } from '../../hooks/store';
import UserList from './usersList';

function Users() {
    const [state, dispatch] = useContext(Context);

    useEffect(() => {
        dispatch({ type: 'SET_ROUTE', payload: 'users' });
        //GetApplicationDetails();
    }, []);

    return (
        <div className="users-container">
            <h1 className="main-header-h1">Users</h1>
            <div className="add-search-user">
                <AddButton
                    width="40px"
                    height="35px"
                    placeholder="+"
                    colorType="lightPurple"
                    backgroundColorType="darkPurple"
                    fontSize="23px"
                    fontWeight="bold"
                    // onClick={addUser}
                />
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
            </div>
            <UserList />
        </div>
    );
}
export default Users;
