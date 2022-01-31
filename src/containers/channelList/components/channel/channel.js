// import "./channel.scss";
// import React, { useState, useContext, useEffect } from "react";
// import { Context } from "../../../../hooks/store";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import Popover from "@material-ui/core/Menu";
// import MenuItem from "@material-ui/core/MenuItem";
// import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import EditIcon from "@material-ui/icons/Edit";
// import PublishIcon from "@material-ui/icons/Publish";
// import BackupIcon from "@material-ui/icons/Backup";
// import BlockIcon from "@material-ui/icons/Block";
// import DeleteIcon from "@material-ui/icons/Delete";
// import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
// import { Divider } from "@material-ui/core";
// import { Trans } from "@lingui/macro";
// import { httpRequest } from "../../../../services/http";
// import { ApiEndpoint } from "../../../../models/AM/apiEndpoint.model";
// import Modal from "../../../../components/modal/modal";
// import Tooltip from "../../../../components/tooltip/tooltip";
// import OverflowTip from "../../../../components/tooltip/overflowtip";
// import loading from "../../../../assets/images/strech.gif";
// import pathControllers from "../../../../routes/router";
// import { Link, Redirect } from "react-router-dom";
// import { InboxOutlined } from "@ant-design/icons";
// import Button from "../../../../components/button/button";

// const Channel = (props) => {
//   const [state, dispatch] = useContext(Context);
//   const [usecases, setUsecases] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [chosenUsecaseId, setchosenUsecaseId] = useState(null);
//   const [usecaseRemoveRes, setUsecaseRemoveRes] = useState(null);
//   const [modalIsOpen, modalFlip] = useState(false);
//   const [chooseUsecase, setchooseUsecase] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleClickMenu = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };

//   useEffect(() => {
//     getUsersUsecases();
//   }, []);

//   const getUsersUsecases = async () => {
//     try {
//       const data = await httpRequest("GET", ApiEndpoint.GET_USER_USECASES);
//       setTimeout(() => {
//         setIsLoading(false);
//         setUsecases(data);
//       }, 1000);
//     } catch (err) { }
//   };

//   const updateUsecases = (usecase) => {
//     let updatedUsecases = usecases;
//     const index = usecases.findIndex(
//       (usecase) => usecase._id === chosenUsecaseId
//     );
//     updatedUsecases[index] = usecase;
//     setchooseUsecase(updatedUsecases);
//     setUsecases(updatedUsecases);
//   };

//   const enableUsecase = async () => {
//     try {
//       const data = await httpRequest("PUT", ApiEndpoint.ENABLE_USECASE, {
//         usecaseId: chosenUsecaseId,
//       });
//       updateUsecases(data);
//     } catch (err) { }
//   };

//   const disableUsecase = async () => {
//     try {
//       const data = await httpRequest(
//         "PUT",
//         ApiEndpoint.DISABLE_USECASE,
//         { usecaseId: chosenUsecaseId },
//         {}
//       );
//       updateUsecases(data);
//     } catch (err) { }
//   };

//   const removeUsecase = async () => {
//     try {
//       await httpRequest(
//         "DELETE",
//         `${ApiEndpoint.REMOVE_USECASE}?usecaseId=${chosenUsecaseId}`);
//       setUsecaseRemoveRes("Use Case removed");
//       setUsecases(usecases.filter((item) => item._id !== chosenUsecaseId));
//     } catch (err) {
//       setUsecaseRemoveRes("Error while removing a use case");
//       modalFlip(true);
//     }
//   };

//   const handleCreateNewUsecase = () => {
//     props.createNewUsecase();
//   };

//   return (
//     <div className="useCaseList-container">
//       {isLoading && (
//         <div className="loader-uploading">
//           <img alt="loading" src={loading}></img>
//         </div>
//       )}
//       {!isLoading && usecases.length === 0 && (
//         <div className="no-pipline-to-display">
//           <InboxOutlined
//             style={{ fontSize: "40px", color: "#5D4AEE" }}
//             theme="outlined"
//           />
//           <p className="nodata">No use cases to display</p>
//           <Button
//             className="modal-btn"
//             width="240px"
//             height="36px"
//             placeholder={<Trans>Create your first use case</Trans>}
//             colorType="white"
//             radiusType="circle"
//             backgroundColorType="orange"
//             fontSize="14px"
//             fontWeight="bold"
//             aria-controls="usecse-menu"
//             aria-haspopup="true"
//             onClick={handleCreateNewUsecase}
//           />
//         </div>
//       )}
//       <div className="useCaseList">
//         {usecases.map((usecase, item) => {
//           return (
//             <div
//               className="useCase-card-container"
//               key={usecase._id}
//               index={item}
//             >
//               <div className="useCase-card-title">
//                 {usecase.enabled && (
//                   <div className="usecase-indication">
//                     <Tooltip text="Enabled" color="white">
//                       <FiberManualRecordIcon
//                         className="FiberManualRecordIcon"
//                         fontSize="small"
//                       ></FiberManualRecordIcon>
//                     </Tooltip>
//                   </div>
//                 )}
//                 <Link to={`${pathControllers.usecases}/${usecase._id}`}>
//                   <h2 className="usecase-list-name">
//                     <OverflowTip
//                       text={usecase.name}
//                       width={"220px"}
//                       color="white"
//                       cursor="pointer"
//                     >
//                       {usecase.name}
//                     </OverflowTip>
//                   </h2>
//                 </Link>
//                 <div className="status-and-threedots">
//                   <MoreVertIcon
//                     key={item._id}
//                     aria-controls="action-usecase"
//                     aria-haspopup="true"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       setchosenUsecaseId(usecase._id);
//                       setchooseUsecase(usecase);
//                       handleClickMenu(e);
//                     }}
//                     className="usecase-threedots-icon"
//                   />
//                 </div>
//               </div>

//               <div className="useCase-card-description">
//                 <p>{usecase.description || "Empty description"}</p>
//               </div>
//               <Popover
//                 classes={{ paper: "Menu" }}
//                 id="action-usecase"
//                 anchorEl={anchorEl}
//                 open={Boolean(anchorEl)}
//                 onClose={handleCloseMenu}
//               >
//                 <MenuItem
//                   disabled={chooseUsecase?.enabled}
//                   onClick={() => {
//                     enableUsecase();
//                     handleCloseMenu();
//                   }}
//                 >
//                   <PlayArrowIcon
//                     style={{ fontSize: 14 }}
//                     className="usecase-list-icon"
//                   />
//                   <label className="usecase-list-label panel-user">
//                     <Trans>Run active pipelines</Trans>
//                   </label>
//                 </MenuItem>
//                 <Divider />
//                 <Link to={`${pathControllers.usecases}/${chosenUsecaseId}`}>
//                   <MenuItem
//                     onClick={() => {
//                       handleCloseMenu();
//                     }}
//                   >
//                     <EditIcon
//                       style={{ fontSize: 14 }}
//                       className="usecase-list-icon"
//                     />
//                     <label className="usecase-list-label panel-user">
//                       <Trans>Edit</Trans>
//                     </label>
//                   </MenuItem>
//                 </Link>
//                 <Divider />
//                 <MenuItem
//                   disabled
//                   onClick={() => {
//                     handleCloseMenu();
//                   }}
//                 >
//                   <PublishIcon
//                     style={{ fontSize: 14 }}
//                     className="usecase-list-icon"
//                   />
//                   <label className="usecase-list-label panel-user">
//                     <Trans>Share (your organization)</Trans>
//                   </label>
//                 </MenuItem>
//                 <Divider />
//                 <MenuItem
//                   disabled
//                   onClick={() => {
//                     handleCloseMenu();
//                   }}
//                 >
//                   <BackupIcon
//                     style={{ fontSize: 14 }}
//                     className="usecase-list-icon"
//                   />
//                   <label className="usecase-list-label panel-user">
//                     <Trans>Publish</Trans>
//                   </label>
//                 </MenuItem>
//                 <Divider />
//                 <MenuItem
//                   disabled={!chooseUsecase?.enabled}
//                   onClick={() => {
//                     handleCloseMenu();
//                     disableUsecase();
//                   }}
//                 >
//                   <BlockIcon
//                     style={{ fontSize: 14 }}
//                     className="usecase-list-icon"
//                   />
//                   <label className="usecase-list-label panel-user">
//                     <Trans>Stop future executions</Trans>
//                   </label>
//                 </MenuItem>
//                 <Divider />
//                 <MenuItem
//                   disabled={chooseUsecase?.enabled}
//                   onClick={() => {
//                     !chooseUsecase?.enabled && modalFlip(true);
//                     handleCloseMenu();
//                   }}
//                 >
//                   <DeleteIcon
//                     style={{ fontSize: 14 }}
//                     className="usecase-list-icon"
//                   />
//                   <label className="usecase-list-label panel-user">
//                     <Trans>Remove</Trans>
//                   </label>
//                 </MenuItem>
//               </Popover>
//             </div>
//           );
//         })}

//         <Modal
//           header="Remove use case"
//           height="300px"
//           width="650px"
//           rBtnText="Confirm"
//           lBtnText="Cancel"
//           closeAction={() => modalFlip(false)}
//           lBtnClick={() => {
//             modalFlip(false);
//           }}
//           clickOutside={() => modalFlip(false)}
//           rBtnClick={() => {
//             modalFlip(false);
//             removeUsecase();
//           }}
//           open={modalIsOpen}
//         >
//           Are you sure you want to remove this use case? This will remove all
//           pipelines connected to this use case.
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default Channel;
