import './style.scss';

import React, { useState, useContext, useEffect } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import EditOutlined from '@material-ui/icons/EditOutlined';
import { Divider } from '@material-ui/core';

import OverflowTip from '../../../components/tooltip/overflowtip';
import { httpRequest } from '../../../services/http';
import { ApiEndpoints } from '../../../const/apiEndpoints';
import Modal from '../../../components/modal';
import { Context } from '../../../hooks/store';
import pathControllers from '../../../router';

const Factory = (props) => {
    const [state, dispatch] = useContext(Context);
    const [modalIsOpen, modalFlip] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [botUrl, SetBotUrl] = useState('');
    const botId = 1;
    const parseDate = new Date(props.content.creation_date).toLocaleDateString();

    useEffect(() => {
        setBotImage(props.content?.user_avatar_id || botId);
    }, []);

    const setBotImage = (botId) => {
        SetBotUrl(require(`../../../assets/images/bots/${botId}.svg`));
    };

    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const removeFactory = async () => {
        try {
            await httpRequest('DELETE', ApiEndpoints.REMOVE_FACTORY, {
                factory_name: props.content.name
            });
            props.removeFactory();
        } catch (err) {}
    };

    return (
        <div className="factory">
            <div className="factory-card-container" key={props.content.id}>
                <Link style={{ cursor: 'pointer' }} to={`${pathControllers.factoriesList}/${props.content.name}`}>
                    <div className="factory-card-title">
                        <h2>
                            <OverflowTip text={props.content.name} width={'220px'} color="white" cursor="pointer">
                                {props.content.name}
                            </OverflowTip>
                        </h2>
                        <div>
                            <MoreVertIcon
                                aria-controls="long-button"
                                aria-haspopup="true"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleClickMenu(e);
                                }}
                                className="threedots-menu"
                            />
                        </div>
                    </div>
                    <div className="factory-card-description">
                        <p>{props.content.description || 'Empty description'}</p>
                    </div>
                </Link>
                <div className="factory-owner">
                    <div className="user-avatar">
                        <img src={botUrl} width={25} height={25} alt="bot"></img>
                    </div>
                    <div className="user-details">
                        <p>{props.content.created_by_user}</p>
                        <span>{parseDate}</span>
                    </div>
                </div>
                <Popover id="long-menu" classes={{ paper: 'Menu' }} anchorEl={anchorEl} onClose={handleCloseMenu} open={open}>
                    <Link to={`${pathControllers.factoriesList}/${props.content._id}`}>
                        <MenuItem
                            onClick={() => {
                                handleCloseMenu();
                            }}
                        >
                            <EditOutlined className="menu-item-icon" />
                            <label className="menu-item-label">Edit</label>
                        </MenuItem>
                    </Link>
                    <Divider />
                    <MenuItem
                        onClick={() => {
                            modalFlip(true);
                            handleCloseMenu();
                        }}
                    >
                        <DeleteOutline className="menu-item-icon" />
                        <label className="menu-item-label">Remove</label>
                    </MenuItem>
                </Popover>
            </div>
            <Modal
                header="Remove Factory"
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
                    removeFactory();
                }}
                open={modalIsOpen}
            >
                Are you sure you want to remove this factory? This will remove all factories in this factory.
            </Modal>
        </div>
    );
};

export default Factory;
