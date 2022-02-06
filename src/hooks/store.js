import React, { createContext, useReducer } from "react";
import Reducer from './reducer'


const initialState = {
    userData: {
        id: "",
        first_name: "",
        last_name: "",
        mail: "",
        password: "",
        organization_id: "",
        role: "",
        group_id: "",
        is_active: false,
        last_login: "",
        last_ip: "",
        pending_profile_activation: true,
        already_create_usecase_flag: false,
        already_saw_schema_page_flag: false,
        organization_name: "",
        plan_id: "",
        register_date: "",
        want_hear_new_feature: false,
    },
    organizationDetails: {
        id: 0,
        name: "",
        contact_phone_number: "",
        root_user_id: "",
        plan_id: "",
        profile_pic_url: "",
        sub_domain: ""
    },
    loading: false,
    error: null,
    isAuthentication: false,
    route: ""
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;