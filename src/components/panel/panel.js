import "./panel.scss";
import React, { useEffect, useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { MenuItem, Divider, Popover } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { MenuOutlined } from "@ant-design/icons";
import { Context } from "../../hooks/store";
import { useMediaQuery } from "react-responsive";
import pathControllers from "../../router";
import Logo from "../../assets/images/logo.png";
import Arrow from "../../assets/images/arrow.svg";
import LocalStorageService from "../../services/auth";
import { ApiEndpoint } from "../../apiEndpoints.model";
import { httpRequest } from "../../services/http";
import config from "../../config/config.json";



const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 850 });
  return isDesktop ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 849 })
  return isMobile ? children : null
}


function Panel(props) {
  const [state, dispatch] = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const [loguUrl, setloguUrl] = useState("");
  const locationPath = window.location?.pathname;


  const getImage = () => {
    if (state.organizationDetails?.profile_pic_url !== null) {
      setloguUrl(state.organizationDetails?.profile_pic_url);
    } else if (
      localStorage.getItem(config.LOCAL_STORAGE_ORGANIZATION_LOGO_URL) !==
      "null"
    ) {
      setloguUrl(
        localStorage.getItem(config.LOCAL_STORAGE_ORGANIZATION_LOGO_URL)
      );
    }
  };

  const getUserData = async () => {
    dispatch({ type: "SET_LOADER", payload: true });
    try {
      const data = await httpRequest(
        "GET",
        ApiEndpoint.GET_USER_BY_ID,
        {},
        {},
        {
          userId: localStorage.getItem(config.LOCAL_STORAGE_USER_ID),
        }
      );
      if (data && data !== undefined) {
        dispatch({ type: "SET_USER_DATA", payload: data });
        await getOrganizationDeatails(data.organizationId);
        dispatch({ type: "SET_LOADER", payload: false });
        localStorage.setItem(config.LOCAL_STORAGE_SAW_SCHEMA, data.already_saw_schema_page_flag);

      } else {
        dispatch({ type: "SET_LOADER", payload: false });
        alert("something occured... get UserData didnt complete"); //replact to show unsuccess message
      }
    } catch (err) {
      dispatch({ type: "SET_LOADER", payload: false });
    }
  };

  useEffect(() => {
    getImage();
  }, [state.organizationDetails?.profile_pic_url]);

  useEffect(() => {
    if (locationPath !== pathControllers.login && locationPath !== pathControllers.recoverPassword && locationPath !== pathControllers.initialLogin) {
      getUserData();
    }
  }, [state.showPanel]);

  const logOut = async () => {
    dispatch({ type: "SET_LOADER", payload: true });
    try {
      await httpRequest("POST", ApiEndpoint.LOGOUT);
      handleClose();
      dispatch({ type: "SET_LOADER", payload: false });
      LocalStorageService.logOut();
      history.push(pathControllers.login);
    } catch (err) {
      LocalStorageService.logOut();
      history.push(pathControllers.login);
      dispatch({ type: "SET_LOADER", payload: false });
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getOrganizationDeatails = async (OrganizationId) => {
    try {
      const organiztionDetails = await httpRequest(
        "GET",
        ApiEndpoint.GET_ORGANIZATION_DETAILS,
        {},
        { organizationId: OrganizationId }
      );
      if (organiztionDetails && organiztionDetails !== undefined) {
        dispatch({
          type: "SET_ORGANIZATION_DATA",
          payload: organiztionDetails,
        });
        localStorage.setItem(
          config.LOCAL_STORAGE_ORGANIZATION_LOGO_URL,
          organiztionDetails.profile_pic_url
        );

        dispatch({ type: "SET_LOADER", payload: false });
      } else {
        dispatch({ type: "SET_LOADER", payload: false });
        alert("something occured... getOrganizationData didnt complete"); //replact to show unsuccess message
      }
    } catch (err) {
      dispatch({ type: "SET_LOADER", payload: false });
    }
  };


  return (
    <div>
      <Desktop>
        <div className="panel-back" style={{
          paddingTop: state.showPanel ? null : '0',
          display: state.showPanel ? null : 'flex',
          alignItems: state.showPanel ? null : 'center',
          justifyContent: state.showPanel ? null : 'center',
          width: state.showPanel ? null : '100vw',
          minWidth: state.showPanel ? null : '1300px',
        }}>
          <div
            className="panel"
            style={{
              backgroundColor: state.route === "usecases" ? "#f7f7f7" : "#f0f1f7",
              width: state.showPanel ? '92vw' : '98vw',
              margin: state.showPanel ? null : '0 auto'
            }}
          >
            {state.showPanel ? (
              <div className="panel-header-container">
                <div className="panel-container">
                  <div className="panel-welcome">
                    <label className="panel-bold-label">
                      {" "}
                      Welcome To Strech
                    </label>
                    &nbsp;
                    <label>
                      Data Analytics Clou
                    </label>
                  </div>
                  <div className="panel-header">
                    <div id="panel-img-divider">
                      <img
                        className="panel-company-logo"
                        src={loguUrl !== "" ? loguUrl : Logo}
                        alt="strech"
                      ></img>
                    </div>
                    <div className="panel-user-header">
                      <div onClick={handleClick}>
                        <label className="panel-bold-label panel-user">
                          {localStorage.getItem(config.LOCAL_STORAGE_USER_NAME)}
                        </label>
                        <img src={Arrow} alt="strech" id="panel-arrow" />
                        <br />
                        <label className="panel-user panel-position">
                          {localStorage.getItem(config.LOCAL_STORAGE_USER_ROLE) || state.userData?.role}
                        </label>
                      </div>
                      <Popover
                        classes={{ paper: "Popover" }}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem disabled className="menuheader">
                          <img src={Logo} id="panel-menu-img" alt="strech" />
                          <label className="panel-user-menu">
                            {localStorage.getItem(config.LOCAL_STORAGE_USER_NAME)}
                            <br />
                            <label className="panel-position-menu">
                              {localStorage.getItem(config.LOCAL_STORAGE_USER_ROLE) || state.userData?.role}
                            </label>
                          </label>
                        </MenuItem>
                        <Divider />
                        <Link to={pathControllers.account}>
                          <MenuItem
                            className="panel-menu-item"
                            onClick={() => {
                              handleClose();
                            }}
                          >
                            <PersonIcon className="panel-menu-icon" />
                            <label className="panel-menu-label panel-bold-label">
                              Accoun
                            </label>
                          </MenuItem>
                        </Link>
                        <a
                          href="https://docs.strech.io"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <MenuItem
                            onClick={handleClose}
                            className="panel-menu-item"
                          >
                            <img
                              className="panel-menu-support"
                              alt=""
                              src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQ5MC42NjcsMTUzLjk5M1Y5NmMwLTQxLjE2Ny0zMy41LTc0LjY2Ny03NC42NjctNzQuNjY3aC01Ny45OTJDMzI2LjcyMyw3LjY4LDI5Mi4yNTksMCwyNTYsMCAgICBzLTcwLjcyMyw3LjY4LTEwMi4wMDgsMjEuMzMzSDk2Yy00MS4xNjcsMC03NC42NjcsMzMuNS03NC42NjcsNzQuNjY3djU3Ljk5M0M3LjY4LDE4NS4yNzksMCwyMTkuNzQyLDAsMjU2ICAgIHM3LjY4LDcwLjcyMSwyMS4zMzMsMTAyLjAwN1Y0MTZjMCw0MS4xNjcsMzMuNSw3NC42NjcsNzQuNjY3LDc0LjY2N2g1Ny45OTJDMTg1LjI3Nyw1MDQuMzIsMjE5Ljc0MSw1MTIsMjU2LDUxMiAgICBzNzAuNzIzLTcuNjgsMTAyLjAwOC0yMS4zMzNINDE2YzQxLjE2NywwLDc0LjY2Ny0zMy41LDc0LjY2Ny03NC42Njd2LTU3Ljk5M0M1MDQuMzIsMzI2LjcyMSw1MTIsMjkyLjI1OCw1MTIsMjU2ICAgIFM1MDQuMzIsMTg1LjI3OSw0OTAuNjY3LDE1My45OTN6IE0zMTEuNzcxLDUwLjMxNWM3Mi44MTUsMTkuNzc2LDEzMC4xNDMsNzcuMTAzLDE0OS45MTUsMTQ5LjkyM2wtNjMuMzg0LDEwLjU2OSAgICBjLTE0LjY1OS00Ni4wNDItNTEuMDY5LTgyLjQ0OC05Ny4xMDgtOTcuMTA3TDMxMS43NzEsNTAuMzE1eiBNMjAwLjIyOSw1MC4zMTVsMTAuNTc3LDYzLjM4NSAgICBjLTQ2LjAzOSwxNC42NTktODIuNDQ5LDUxLjA2NS05Ny4xMDgsOTcuMTA3bC02My4zODQtMTAuNTY5QzcwLjA4NiwxMjcuNDE4LDEyNy40MTQsNzAuMDkxLDIwMC4yMjksNTAuMzE1eiBNNDIuNjY3LDk2ICAgIGMwLTI5LjQwNiwyMy45MTctNTMuMzMzLDUzLjMzMy01My4zMzNoMTguNzI5Yy0wLjEwOSwwLjA3My0wLjIwOCwwLjE2LTAuMzE4LDAuMjMzYy02LjA3Nyw0LjA1Mi0xMS45MDYsOC40MjgtMTcuNjA0LDEyLjk3ICAgIGMtMC45NjEsMC43NjQtMi4wMDEsMS40MzEtMi45NTEsMi4yMDhjLTEzLjA3MywxMC43MjktMjUuMDYzLDIyLjcyMy0zNS43OSwzNS43OTZjLTAuNzE5LDAuODc4LTEuMzMzLDEuODM3LTIuMDQsMi43MjUgICAgYy00LjYsNS43NTktOS4wMjMsMTEuNjYtMTMuMTIyLDE3LjgwOWMtMC4wNzQsMC4xMTEtMC4xNjMsMC4yMTEtMC4yMzcsMC4zMjJWOTZ6IE05Niw0NjkuMzMzICAgIGMtMjkuNDE3LDAtNTMuMzMzLTIzLjkyNy01My4zMzMtNTMuMzMzdi0xOC43MjljMC4wNzQsMC4xMTEsMC4xNjMsMC4yMTEsMC4yMzcsMC4zMjJjNC4wOTksNi4xNDgsOC41MjIsMTIuMDQ5LDEzLjEyMiwxNy44MDkgICAgYzAuNzA3LDAuODg4LDEuMzIyLDEuODQ4LDIuMDQsMi43MjVjMTAuNzI4LDEzLjA3MywyMi43MTcsMjUuMDY2LDM1Ljc5LDM1Ljc5NmMwLjk0OSwwLjc3NywxLjk5LDEuNDQ0LDIuOTUxLDIuMjA4ICAgIGM1LjY5OCw0LjU0MiwxMS41MjcsOC45MTgsMTcuNjA0LDEyLjk3YzAuMTA5LDAuMDczLDAuMjA4LDAuMTYsMC4zMTgsMC4yMzNIOTZ6IE0yMDAuMjI5LDQ2MS42ODUgICAgYy03Mi44MTQtMTkuNzc2LTEzMC4xNDMtNzcuMTAyLTE0OS45MTUtMTQ5LjkyMWw2My4zODQtMTAuNTdjMTQuNjU5LDQ2LjA0Miw1MS4wNjksODIuNDQ3LDk3LjEwOCw5Ny4xMDVMMjAwLjIyOSw0NjEuNjg1eiAgICAgTTE0OS4zMzMsMjU2YzAtNTguODEzLDQ3Ljg1NC0xMDYuNjY3LDEwNi42NjctMTA2LjY2N1MzNjIuNjY3LDE5Ny4xODgsMzYyLjY2NywyNTZTMzE0LjgxMywzNjIuNjY3LDI1NiwzNjIuNjY3ICAgIFMxNDkuMzMzLDMxNC44MTMsMTQ5LjMzMywyNTZ6IE0zMTEuNzcxLDQ2MS42ODVsLTEwLjU3Ny02My4zODVjNDYuMDM5LTE0LjY1OSw4Mi40NDktNTEuMDY0LDk3LjEwOC05Ny4xMDVsNjMuMzg0LDEwLjU3ICAgIEM0NDEuOTE0LDM4NC41ODMsMzg0LjU4NSw0NDEuOTA5LDMxMS43NzEsNDYxLjY4NXogTTQ2OS4zMzMsNDE2YzAsMjkuNDA2LTIzLjkxNyw1My4zMzMtNTMuMzMzLDUzLjMzM2gtMTguNzI5ICAgIGMwLjEwOS0wLjA3MywwLjIwOC0wLjE2MSwwLjMxOC0wLjIzNGM2LjA1Mi00LjAzNSwxMS44NTUtOC4zOTMsMTcuNTMxLTEyLjkxNWMwLjk4OC0wLjc4NSwyLjA1NS0xLjQ2OSwzLjAzLTIuMjY3ICAgIGMxMy4wNjgtMTAuNzI1LDI1LjA1My0yMi43MTQsMzUuNzc3LTM1Ljc4MWMwLjc0Ny0wLjkxMSwxLjM4Ny0xLjkxMywyLjEyMS0yLjgzNmM0LjU3Mi01LjcyOSw4Ljk3My0xMS41OTQsMTMuMDQ4LTE3LjcwNyAgICBjMC4wNzQtMC4xMTEsMC4xNjMtMC4yMTEsMC4yMzctMC4zMjJWNDE2eiBNNDY5LjMzMywxMTQuNzI5Yy0wLjA3NC0wLjExMS0wLjE2My0wLjIxMS0wLjIzNy0wLjMyMiAgICBjLTQuMDc2LTYuMTEzLTguNDc3LTExLjk3OC0xMy4wNDgtMTcuNzA3Yy0wLjczNC0wLjkyMy0xLjM3NC0xLjkyNC0yLjEyMS0yLjgzNmMtMTAuNzI0LTEzLjA2OC0yMi43MS0yNS4wNTYtMzUuNzc3LTM1Ljc4MSAgICBjLTAuOTc1LTAuNzk4LTIuMDQyLTEuNDgyLTMuMDMtMi4yNjdjLTUuNjc2LTQuNTIyLTExLjQ3OS04Ljg4LTE3LjUzMS0xMi45MTVjLTAuMTA5LTAuMDczLTAuMjA4LTAuMTYxLTAuMzE4LTAuMjM0SDQxNiAgICBjMjkuNDE3LDAsNTMuMzMzLDIzLjkyNyw1My4zMzMsNTMuMzMzVjExNC43Mjl6IiBmaWxsPSIjNWQ0YWVlIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
                            />
                            <label className="panel-menu-label panel-bold-label">
                              Suppor
                            </label>
                          </MenuItem>
                        </a>
                        <MenuItem onClick={logOut}
                          disabled={localStorage.getItem(config.LOCAL_STORAGE_ORGANIZATION_ID) === config.DEMO_ORGANIZATION_ID || state.userData?.organization_id === config.DEMO_ORGANIZATION_ID}
                          className="panel-menu-item">
                          <ExitToAppRoundedIcon className="panel-menu-icon" />
                          <label className="panel-menu-label panel-bold-label">
                            Logou
                          </label>
                        </MenuItem>
                      </Popover>
                    </div>
                  </div>
                </div>
                <Divider style={{ position: "relative", zIndex: "2" }} />
              </div>
            ) : (
              <></>
            )}
            <div className="panel-body" style={{
              // height:state.showPanel?'calc(96vh - 90px)':'calc(96vh)', 
              height: state.showPanel ? 'calc(95vh - 75px)' : 'calc(95vh)',
              borderRadius: !state.showPanel ? '30px' : null,
              backgroundColor: !state.showPanel ? '#f0f1f7' : null,
              minHeight: !state.showPanel ? '650px' : null,
              overflow: state.showPanel ? 'hidden' : null
            }}>
              {props.content}
            </div>
          </div>
        </div>
      </Desktop>
      <Mobile>
        <div className="panel-body-mobile">
          <div className="panel-header-mobile">
            <img src={Logo} width="35" height="35" alt="logo" />
            <MenuOutlined className="menu-icon-mobile" onClick={handleClick} />
            <Popover
              classes={{ paper: "Popover-mobile" }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={logOut} className="panel-menu-item"
                disabled={localStorage.getItem(config.LOCAL_STORAGE_ORGANIZATION_ID) === config.DEMO_ORGANIZATION_ID || state.userData?.organization_id === config.DEMO_ORGANIZATION_ID}>
                <ExitToAppRoundedIcon className="panel-menu-icon" />
                <label className="panel-menu-label panel-bold-label">
                  Logou
                </label>
              </MenuItem>
            </Popover>

          </div>
          <Divider style={{ position: "relative", zIndex: "2" }} />
          <div className="panel-content-mobile">
            {props.content}
          </div>
        </div>
      </Mobile>
    </div>
  );
}

export default Panel;
