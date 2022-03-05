import "./sideBar.scss";
import React, { useContext, useState } from "react";
import { Context } from "../../hooks/store";
import { Link } from "react-router-dom";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useMediaQuery } from "react-responsive";
import Logo from "../../assets/images/logo.png";
import usersIcon from "../../assets/images/usersIcon.svg";
import usersIconWhite from "../../assets/images/usersIconWhite.svg";
import useCaseIcon from "../../assets/images/useCaseIcon.svg";
import useCaseIconWhite from "../../assets/images/useCaseIconWhite.svg";
import pathControllers from "../../router";
import config from "../../config/config.json"
import { ApiEndpoint } from "../../apiEndpoints.model";
import { httpRequest } from "../../services/http";


const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 850 });
  return isDesktop ? children : null
}

function SideBar() {
  const [state, dispatch] = useContext(Context);

  return (
    <Desktop>
      <div className="sidebar-container">
          <div className="upper-icons">
            <Link to={pathControllers.overview}>
              <img src={Logo} className="logoimg" alt="logo" />
            </Link>
            <div className="item-wrapper">
              <Link to={pathControllers.overview}>
                <IconButton className="icon">
                    <div
                      className={
                        state.route === "overview"
                          ? "circle-nav-item checked"
                          : "circle-nav-item"
                      }
                    >
                      <DashboardRoundedIcon />
                    </div>
                </IconButton>
              </Link>
              <p className={state.route === "overview" ? "name-checked" : "name"}>
                Dashboard
              </p>
            </div>
            <div className="item-wrapper">
              <Link to={pathControllers.applicationList}>
                  <IconButton className="icon">
                    <div
                      className={
                        state.route === "applications"
                          ? "circle-nav-item checked"
                          : "circle-nav-item"
                      }
                    >
                      {state.route === "applications" ? (
                        <img
                          src={useCaseIconWhite}
                          alt="useCaseIconWhite"
                          width="27"
                          height="27"
                        ></img>
                      ) : (
                        <img
                          src={useCaseIcon}
                          alt="useCaseIcon"
                          width="27"
                          height="27"
                        ></img>
                      )}

                    </div>
                  </IconButton>
              </Link>
              <p className={state.route === "applications" ? "name-checked" : "name"}>
                Boxes
              </p>
            </div>

            <div className="item-wrapper">
              <Link to={pathControllers.users}>
                  <IconButton className="icon">
                    <div
                      className={
                        state.route === "users"
                          ? "circle-nav-item checked"
                          : "circle-nav-item"
                      }
                    >
                      {state.route === "users" ? (
                        <img
                          src={usersIconWhite}
                          alt="usersIconWhite"
                          width="27"
                          height="27"
                        ></img>
                      ) : (
                        <img
                          src={usersIcon}
                          alt="usersIcon"
                          width="27"
                          height="27"
                        ></img>
                      )}
                    </div>
                  </IconButton>
              </Link>
              <p className={state.route === "users" ? "name-checked" : "name"}>
                Users
              </p>
            </div>
            
          </div>
          <div className="bottom-icons">
            <IconButton className="icon">
              <AccountCircle />
            </IconButton>
          </div>
      </div>
    </Desktop>

  );
}

export default SideBar;
