import { GoOrganization, GoPerson, GoBook } from "react-icons/go"
import ControlSection from "./ControlSection";

const ContextBar = () => {
    return (
        <div className="context-bar">
            <div className="flex flex-col flex-grow hidden-scroll-y">
                <ul className="order-first ">
                    <ContentButton icon={<GoBook size="20"/>} text="Servers"/>
                    <ContentButton icon={<GoPerson size="20"/>} text="Account"/>
                    <ContentButton icon={<GoOrganization size="20"/>} text="Friends"/>
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

const ContentButton = ({icon, text}:any) => {
    return (
        <div className="context-button">
            <div className="context-icon">
                {icon}
            </div>
            <div className="p-4">
                {text}
            </div>
        </div>
    )
}

const UserButton = ({icon, text}:any) => { //Will eventually take user info as prop
    return (
        <div className="context-button">
            <div className="context-icon">
                <GoPerson size="20"/>
            </div>
            <div className="p-4">
                {text}
            </div>
        </div>
    )
}

export default ContextBar;