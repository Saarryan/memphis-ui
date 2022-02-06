import React, { useEffect, useContext } from "react";
import AddButton from "../../components/addButton/addButton";
import SearchInput from "../../components/searchInput/searchInput";
import { SearchOutlined } from "@ant-design/icons";
import UserList from "./components/userList";
import { Context } from "../../hooks/store";
import "./users.scss";

function Users() {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    dispatch({ type: "SET_ROUTE", payload: "users" });
    //GetApplicationDetails();
  }, []);
  return (
    <React.Fragment>
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
          backgroundColorType="transparent"
          width="10vw"
          height="27px"
          borderRadiusType="square"
          borderBottom="1px solid rgba(43, 46 , 63, 0.2)"
          iconComponent={<SearchOutlined />}
        //   onChange={handleSearch}
        //   value={searchInput}
        />
      </div>
      <UserList />
    </React.Fragment>
  );
}
export default Users;
