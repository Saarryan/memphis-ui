import "./sideBar.scss";
import React, { useContext, useState } from "react";
import { Context } from "../../hooks/store";
import { Link } from "react-router-dom";
import DashboardRoundedIcon from "@material-ui/icons/DashboardRounded";
import IconButton from "@material-ui/core/IconButton";
import AccountBoxRoundedIcon from "@material-ui/icons/AccountBoxRounded";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";
import Tooltip from "../../components/tooltip/tooltip";
import Logo from "../../assets/images/logo.png";
import usersIcon from "../../assets/images/usersIcon.svg";
import usersIconWhite from "../../assets/images/usersIconWhite.svg";
import useCaseIcon from "../../assets/images/useCaseIcon.svg";
import useCaseIconWhite from "../../assets/images/useCaseIconWhite.svg";
import pathControllers from "../../router";
import config from "../../config/config.json"
import { ApiEndpoint } from "../../apiEndpoints.model";
import { httpRequest } from "../../services/http";


const useStyles = makeStyles((theme) => ({
  iconSize: {
    "& svg": {
      fontSize: 27,
    },
  },
  blink: {
    "& svg": {
      fontSize: 27,
    },
    backgroundColor: "rgba(0,0,0,0.04)",
    animation: "blink 1s",
    animationIterationCount: "infinite"
  }
}));

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 850 });
  return isDesktop ? children : null
}

function SideBar() {
  const classes = useStyles();
  const [state, dispatch] = useContext(Context);

  return (
    <Desktop>
      <div className="sidebar">
        <div>
          <Link to={pathControllers.overview}>
            <img src={Logo} className="sidebar-logoimg" alt="logo" />
          </Link>
          <div className="sidebar-icons">
            <Link to={pathControllers.overview}>
              <IconButton className={classes.iconSize}>
                <Tooltip text="Overview">
                  <div
                    className={
                      state.route === "overview"
                        ? "sidebar-circle-icon sidebar-icon-checked "
                        : "sidebar-circle-icon sidebar-icon"
                    }
                  >
                    <DashboardRoundedIcon />
                  </div>
                </Tooltip>
              </IconButton>
            </Link>

            <Link
              to={pathControllers.applicationList}
            >
              <Tooltip text="Use cases">
                <IconButton className={classes.iconSize}>
                  <div
                    className={
                      state.route === "applications"
                        ? "sidebar-circle-icon sidebar-icon-checked "
                        : "sidebar-circle-icon sidebar-icon"
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
              </Tooltip>
            </Link>
            <Link to={pathControllers.users}>
              <Tooltip text="Users">
                <IconButton className={classes.iconSize}>
                  <div
                    className={
                      state.route === "users"
                        ? "sidebar-circle-icon sidebar-icon-checked "
                        : "sidebar-circle-icon sidebar-icon"
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
              </Tooltip>
            </Link>
          </div>
          <div className="sidebar-supprt">
            <Link to={pathControllers.settings}>
              <Tooltip text="Account">
                <IconButton className={classes.iconSize}>
                  <div
                    className={
                      state.route === "account"
                        ? "sidebar-circle-icon sidebar-icon-checked "
                        : "sidebar-circle-icon sidebar-icon"
                    }
                  >
                    <AccountBoxRoundedIcon />
                  </div>
                </IconButton>
              </Tooltip>
            </Link>
            <a href="https://docs.strech.io" target="_blank" rel="noreferrer">
              <Tooltip text="Support">
                <IconButton className={classes.iconSize}>
                  <div className="sidebar-circle-icon sidebar-icon-support ">
                    <img
                      alt="help"
                      height="25px"
                      width="25px"
                      src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTIiIHhtbDpzcGFjZT0icHJlc2VydmUiIGNsYXNzPSIiPjxnPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgoJPGc+CgkJPHBhdGggZD0iTTQ5MC42NjcsMTUzLjk5M1Y5NmMwLTQxLjE2Ny0zMy41LTc0LjY2Ny03NC42NjctNzQuNjY3aC01Ny45OTJDMzI2LjcyMyw3LjY4LDI5Mi4yNTksMCwyNTYsMCAgICBzLTcwLjcyMyw3LjY4LTEwMi4wMDgsMjEuMzMzSDk2Yy00MS4xNjcsMC03NC42NjcsMzMuNS03NC42NjcsNzQuNjY3djU3Ljk5M0M3LjY4LDE4NS4yNzksMCwyMTkuNzQyLDAsMjU2ICAgIHM3LjY4LDcwLjcyMSwyMS4zMzMsMTAyLjAwN1Y0MTZjMCw0MS4xNjcsMzMuNSw3NC42NjcsNzQuNjY3LDc0LjY2N2g1Ny45OTJDMTg1LjI3Nyw1MDQuMzIsMjE5Ljc0MSw1MTIsMjU2LDUxMiAgICBzNzAuNzIzLTcuNjgsMTAyLjAwOC0yMS4zMzNINDE2YzQxLjE2NywwLDc0LjY2Ny0zMy41LDc0LjY2Ny03NC42Njd2LTU3Ljk5M0M1MDQuMzIsMzI2LjcyMSw1MTIsMjkyLjI1OCw1MTIsMjU2ICAgIFM1MDQuMzIsMTg1LjI3OSw0OTAuNjY3LDE1My45OTN6IE0zMTEuNzcxLDUwLjMxNWM3Mi44MTUsMTkuNzc2LDEzMC4xNDMsNzcuMTAzLDE0OS45MTUsMTQ5LjkyM2wtNjMuMzg0LDEwLjU2OSAgICBjLTE0LjY1OS00Ni4wNDItNTEuMDY5LTgyLjQ0OC05Ny4xMDgtOTcuMTA3TDMxMS43NzEsNTAuMzE1eiBNMjAwLjIyOSw1MC4zMTVsMTAuNTc3LDYzLjM4NSAgICBjLTQ2LjAzOSwxNC42NTktODIuNDQ5LDUxLjA2NS05Ny4xMDgsOTcuMTA3bC02My4zODQtMTAuNTY5QzcwLjA4NiwxMjcuNDE4LDEyNy40MTQsNzAuMDkxLDIwMC4yMjksNTAuMzE1eiBNNDIuNjY3LDk2ICAgIGMwLTI5LjQwNiwyMy45MTctNTMuMzMzLDUzLjMzMy01My4zMzNoMTguNzI5Yy0wLjEwOSwwLjA3My0wLjIwOCwwLjE2LTAuMzE4LDAuMjMzYy02LjA3Nyw0LjA1Mi0xMS45MDYsOC40MjgtMTcuNjA0LDEyLjk3ICAgIGMtMC45NjEsMC43NjQtMi4wMDEsMS40MzEtMi45NTEsMi4yMDhjLTEzLjA3MywxMC43MjktMjUuMDYzLDIyLjcyMy0zNS43OSwzNS43OTZjLTAuNzE5LDAuODc4LTEuMzMzLDEuODM3LTIuMDQsMi43MjUgICAgYy00LjYsNS43NTktOS4wMjMsMTEuNjYtMTMuMTIyLDE3LjgwOWMtMC4wNzQsMC4xMTEtMC4xNjMsMC4yMTEtMC4yMzcsMC4zMjJWOTZ6IE05Niw0NjkuMzMzICAgIGMtMjkuNDE3LDAtNTMuMzMzLTIzLjkyNy01My4zMzMtNTMuMzMzdi0xOC43MjljMC4wNzQsMC4xMTEsMC4xNjMsMC4yMTEsMC4yMzcsMC4zMjJjNC4wOTksNi4xNDgsOC41MjIsMTIuMDQ5LDEzLjEyMiwxNy44MDkgICAgYzAuNzA3LDAuODg4LDEuMzIyLDEuODQ4LDIuMDQsMi43MjVjMTAuNzI4LDEzLjA3MywyMi43MTcsMjUuMDY2LDM1Ljc5LDM1Ljc5NmMwLjk0OSwwLjc3NywxLjk5LDEuNDQ0LDIuOTUxLDIuMjA4ICAgIGM1LjY5OCw0LjU0MiwxMS41MjcsOC45MTgsMTcuNjA0LDEyLjk3YzAuMTA5LDAuMDczLDAuMjA4LDAuMTYsMC4zMTgsMC4yMzNIOTZ6IE0yMDAuMjI5LDQ2MS42ODUgICAgYy03Mi44MTQtMTkuNzc2LTEzMC4xNDMtNzcuMTAyLTE0OS45MTUtMTQ5LjkyMWw2My4zODQtMTAuNTdjMTQuNjU5LDQ2LjA0Miw1MS4wNjksODIuNDQ3LDk3LjEwOCw5Ny4xMDVMMjAwLjIyOSw0NjEuNjg1eiAgICAgTTE0OS4zMzMsMjU2YzAtNTguODEzLDQ3Ljg1NC0xMDYuNjY3LDEwNi42NjctMTA2LjY2N1MzNjIuNjY3LDE5Ny4xODgsMzYyLjY2NywyNTZTMzE0LjgxMywzNjIuNjY3LDI1NiwzNjIuNjY3ICAgIFMxNDkuMzMzLDMxNC44MTMsMTQ5LjMzMywyNTZ6IE0zMTEuNzcxLDQ2MS42ODVsLTEwLjU3Ny02My4zODVjNDYuMDM5LTE0LjY1OSw4Mi40NDktNTEuMDY0LDk3LjEwOC05Ny4xMDVsNjMuMzg0LDEwLjU3ICAgIEM0NDEuOTE0LDM4NC41ODMsMzg0LjU4NSw0NDEuOTA5LDMxMS43NzEsNDYxLjY4NXogTTQ2OS4zMzMsNDE2YzAsMjkuNDA2LTIzLjkxNyw1My4zMzMtNTMuMzMzLDUzLjMzM2gtMTguNzI5ICAgIGMwLjEwOS0wLjA3MywwLjIwOC0wLjE2MSwwLjMxOC0wLjIzNGM2LjA1Mi00LjAzNSwxMS44NTUtOC4zOTMsMTcuNTMxLTEyLjkxNWMwLjk4OC0wLjc4NSwyLjA1NS0xLjQ2OSwzLjAzLTIuMjY3ICAgIGMxMy4wNjgtMTAuNzI1LDI1LjA1My0yMi43MTQsMzUuNzc3LTM1Ljc4MWMwLjc0Ny0wLjkxMSwxLjM4Ny0xLjkxMywyLjEyMS0yLjgzNmM0LjU3Mi01LjcyOSw4Ljk3My0xMS41OTQsMTMuMDQ4LTE3LjcwNyAgICBjMC4wNzQtMC4xMTEsMC4xNjMtMC4yMTEsMC4yMzctMC4zMjJWNDE2eiBNNDY5LjMzMywxMTQuNzI5Yy0wLjA3NC0wLjExMS0wLjE2My0wLjIxMS0wLjIzNy0wLjMyMiAgICBjLTQuMDc2LTYuMTEzLTguNDc3LTExLjk3OC0xMy4wNDgtMTcuNzA3Yy0wLjczNC0wLjkyMy0xLjM3NC0xLjkyNC0yLjEyMS0yLjgzNmMtMTAuNzI0LTEzLjA2OC0yMi43MS0yNS4wNTYtMzUuNzc3LTM1Ljc4MSAgICBjLTAuOTc1LTAuNzk4LTIuMDQyLTEuNDgyLTMuMDMtMi4yNjdjLTUuNjc2LTQuNTIyLTExLjQ3OS04Ljg4LTE3LjUzMS0xMi45MTVjLTAuMTA5LTAuMDczLTAuMjA4LTAuMTYxLTAuMzE4LTAuMjM0SDQxNiAgICBjMjkuNDE3LDAsNTMuMzMzLDIzLjkyNyw1My4zMzMsNTMuMzMzVjExNC43Mjl6IiBmaWxsPSIjZjdmN2Y3IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIiBjbGFzcz0iIj48L3BhdGg+Cgk8L2c+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg=="
                    />
                  </div>
                </IconButton>
              </Tooltip>
            </a>
          </div>
        </div>
      </div>
    </Desktop>

  );
}

export default SideBar;
