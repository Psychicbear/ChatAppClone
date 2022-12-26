import { GoSettings } from "react-icons/go";

const ControlSection = () => {
    return (
        <div className="control-section">
                <ul className="control-item">
                    <li>Username</li>
                    <li>
                        <ul className="flex">
                            <ControlButton icon={<GoSettings size="18"/>} />
                        </ul>
                    </li>
                </ul>
        </div>
    )
};

const ControlButton = ({icon}:any) => {
    return (
        <div className="control-button">
            {icon}
        </div>
    )
}

export default ControlSection;