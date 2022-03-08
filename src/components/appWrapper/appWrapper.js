import SideBar from '../sideBar/sideBar'

function AppWrapper(props) {
    return (
        <div className="sidebar-and-containers">
            <SideBar />
            {props.content}
        </div>
    )
}
export default AppWrapper