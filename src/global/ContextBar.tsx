import { IconType } from "react-icons";
import { GoOrganization, GoPerson, GoBook } from "react-icons/go"
import { Link, Navigate, NavLink, To } from "react-router-dom";
import ControlSection from "./ControlSection";



const ContextBar = () => {
    return (
        <div className="context-bar">
            <div className="flex flex-col flex-grow hidden-scroll-y">
                <ul className="order-first ">
                    <ContentButton icon={<GoBook size="20"/>} text="Servers" link="/friends"/>
                    <ContentButton icon={<GoPerson size="20"/>} text="Account" link="/friends"/>
                    <ContentButton icon={<GoOrganization size="20"/>} text="Friends" link="/friends"/>
                </ul>

                <ul className="">
                    <li className="p-3 pb-0">Direct Messages</li>
                    <li><UserButton text="User 1"/></li>
                    <li><UserButton text="User 1"/></li>

                </ul>
            </div>
            <ControlSection />
        </div>
    )
};

type ContentButtonProps = {
    icon: JSX.Element,
    text: string,
    link: string,
}

const ContentButton 
= (props: ContentButtonProps) => {
    return (
        <NavLink to={props.link} className="context-button">
            <div className="context-icon">
                {props.icon}
            </div>
            <div className="p-4">
                {props.text}
            </div>
        </NavLink>
    )
}
const UserButton = ({icon, text}:any) => { //Will eventually take user info as prop
    return (
        <>
            <NavLink className="context-button" to="/messages/123">
                <div className="context-icon">
                    <GoPerson size="20"/>
                </div>
                <div className="p-4">
                    {text}
                </div>
            </NavLink>
        </>
    )
}

export default ContextBar;