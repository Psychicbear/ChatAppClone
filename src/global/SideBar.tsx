import { Link, Outlet } from "react-router-dom"
import { IconType } from 'react-icons';
import { GoHome, GoMail, GoPlus } from 'react-icons/go';


const SideBar = () => {
    return (
        <>
            <div className="sidebar">
                <ul className="flex flex-col">
                    <li className="order-first"><SideBarIcon icon={<GoHome size="28" />}/></li>
                    <li className="order-last"><SideBarIcon icon={<GoPlus size="28" />}/></li>
                    <li><SideBarIcon icon={<GoMail size="28" />}/></li>
                </ul>
            </div>
            <Outlet />
        </>
    )
};

const SideBarIcon = ({icon, text = 'Tooltip'}:any, ) => {
    
    return (
    <div className="sidebar-icon group">
        {icon}

        <span className="sidebar-tooltip group-hover:scale-100">
            {text}
        </span>
    </div>
)}



export default SideBar;