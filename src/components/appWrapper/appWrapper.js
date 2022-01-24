import Panel from '../panel/panel'
import SideBar from '../sideBar/sideBar'

function AppWrapper(props) {
    return (
        <div className="sidebar-and-panel">
            <SideBar />
            <Panel content={
                <div>
                    {props.content}
                </div>
            } />
        </div>
    )
}
export default AppWrapper