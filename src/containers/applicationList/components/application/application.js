import "./application.scss";
import React, { useState, useContext, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Divider } from "@material-ui/core";
import { InboxOutlined } from "@ant-design/icons";
import { Context } from "../../../../hooks/store";
import pathControllers from "../../../../router";
import { httpRequest } from "../../../../services/http";
import { ApiEndpoint } from "../../../../apiEndpoints.model";
import Modal from "../../../../components/modal/modal";
import Tooltip from "../../../../components/tooltip/tooltip";
import OverflowTip from "../../../../components/tooltip/overflowtip";
import loading from "../../../../assets/images/strech.gif";
import Button from "../../../../components/button/button";
import { makeStyles } from "@material-ui/core/styles";

const ITEM_HEIGHT = 48;
const useStyles = makeStyles(theme => ({
  padding: {
    paddingTop: "300px",
    paddingBottom: "30px"
  }
}));

const Application = (props) => {
  const [state, dispatch] = useContext(Context);
  const [modalIsOpen, modalFlip] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const removeApplication = async () => {
    try {
      await httpRequest(
        "DELETE",
        `${ApiEndpoint.REMOVE_USECASE}?usecaseId=${props.content._id}`);
      //setUsecases(usecases.filter((item) => item._id !== chosenUsecaseId));
    } catch (err) {
      modalFlip(true);
    }
  };

  return (
    <div className="application">
      <div
        className="application-card-container"
        key={props.content._id}
      >
        <div className="application-card-title">
          <Link to={`${pathControllers.applicationList}/${props.content._id}`}>
            <h2>
              <OverflowTip
                text={props.content.name}
                width={"220px"}
                color="white"
                cursor="pointer"
              >
                {props.content.name}
              </OverflowTip>
            </h2>
          </Link>
          <div>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            {/* <MoreVertIcon
              className="application-threedots-icon"
              aria-controls="action-application"
              aria-haspopup="true"
              onClick={(e) => {
                e.preventDefault();
                handleClickMenu(e);
              }}
            /> */}
          </div>
        </div>

        <div className="application-card-description">
          <p>{props.content.description || "Empty description"}</p>
        </div>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
            classes: { padding: classes.padding }
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={handleClose}>
            option
          </MenuItem>
        </Menu>
        {/* <Popover
          id="action-application"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          className="general-menu"
        >
          <Link to={`${pathControllers.applicationList}/${props.content._id}`}>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
              }}
            >
              <EditIcon
                style={{ fontSize: 14 }}
                className="menu-item-icon"
              />
              <label className="menu-item-label">
                Edit
              </label>
            </MenuItem>
          </Link>
          <Divider />
          <MenuItem
            onClick={() => {
              modalFlip(true);
              handleCloseMenu();
            }}
          >
            <DeleteIcon
              style={{ fontSize: 14 }}
              className="menu-item-icon"
            />
            <label className="menu-item-label">
              Remove
            </label>
          </MenuItem>
        </Popover> */}
      </div>
      <Modal
        header="Remove Application"
        height="300px"
        width="650px"
        rBtnText="Confirm"
        lBtnText="Cancel"
        closeAction={() => modalFlip(false)}
        lBtnClick={() => {
          modalFlip(false);
        }}
        clickOutside={() => modalFlip(false)}
        rBtnClick={() => {
          modalFlip(false);
          removeApplication();
        }}
        open={modalIsOpen}
      >
        Are you sure you want to remove this application? This will remove all channels in this application.
      </Modal>
    </div>
  );
};

export default Application;
