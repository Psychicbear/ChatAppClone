import { FormEvent, useState } from "react"
import { GoPerson, GoOrganization, GoPlus, GoReply, GoComment } from "react-icons/go"
import { format, formatRelative, subDays } from "date-fns";
interface Message {
    user: string;
    content: string;
    timestamp: Date;
}

const ChatDirect = () => {
    const [sidebarActive, toggleSidebar] = useState(true);
    const [messages, setMessages] = useState([
        {user: "Riley", content: "Hello World", timestamp: subDays(new Date, 10)},
        {user: "Riley", content: "Welcome to my new chat app", timestamp: subDays(new Date, 10)},
        {user: "Riley", content: "Been a few day since I've messaged here", timestamp: subDays(new Date, 2)},
        {user: "Riley", content: "Today is a new day!", timestamp: subDays(new Date, 1)},
        {user: "Riley", content: "As is today!", timestamp: new Date()},
    ]);
    const changeSideBar = () => {
        toggleSidebar(!sidebarActive)
    }
    return (
        <div className="chat-view">
            <div className="chat-header">
                <div className="flex-grow">Name</div>
                <ul className="flex flex-row-reverse justify-between flex-grow flex-shrink-0">
                    <li onClick={changeSideBar}><SideBarToggle active={sidebarActive}/></li>
                </ul>
            </div>
            <div className="chat-container">
                <div className="chat-main">
                    <div className="chat-bar">
                        <ChatBar />
                    </div>
                    <ul className="chat-content select-text pb-6 order">
                        {messages.map((val) => (
                            <ChatMessage user={val.user} content={val.content} timestamp={val.timestamp}/>
                        ))}
                        <ChatMessage user="Riley" content="Hello World" timestamp={new Date()}/>
                    </ul>
                </div>
                <SideBar active={sidebarActive}/>
            </div>
        </div>
    )
}

const SideBarToggle: React.FC<{
    active: boolean;
}> = ({active}) => {
    
    return (
        <div className={`rounded-xl hover:bg-gray-300 hover:cursor-pointer group`}>
            <GoOrganization size="28"/>

            <span className="tooltip right-0 origin-top-right group-hover:scale-100">
                {active ? "Hide Members List" : "Show Members List"}
            </span>
        </div>
    )
}

const SideBar: React.FC<{
    active: boolean;
}> = ({active}) => {
    return (
        <div className={`chat-sidebar ${!active ? "hidden" : ""}`}>
            <span className="chat-groupheader">Online</span>
            <ul>
                <UserButton  user="Riley" status="Listening to"/>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
            </ul>
        </div>
    )
}

const UserButton: React.FC<{
    user: String;
    status: String;
}> = ({user, status}) => {
    return (
        <li className="flex items-center py-1 hover:bg-dark-600 hover:cursor-pointer rounded-lg text-md">
            <div className="px-2 py-1"><GoPerson size="34" className="bg-gray-400 rounded-full p-1"/></div>
            <div className="flex-row pr-4">
                <p className="font-medium text-primary">{user}</p>
                <p className="text-xs text-primary">{status}</p>
            </div>
        </li>
    )
}

const ChatBar = () => {
    const [message, setMessage] = useState("")

    let sendMessage = (e:FormEvent) => {
        e.preventDefault();
        console.log()
    }

    return (
        <form className="chatform" onSubmit={sendMessage}>
            <button className=""><GoPlus /></button>
            <textarea value={message} onChange={e => setMessage(e.target.value)} className="flex-grow hidden-scroll-y" placeholder="Message #channel"></textarea>
            <button type="submit" className=""><GoComment /></button>
        </form>
    )
}

const ChatMessage: React.FC<Message> = ({user, content, timestamp}) => {
    return (
        <li className="chat-message">
            <div className="items-center p-3 w-16"><GoPerson size="28" /></div>
            <div className="pr-4">
                <p className="font-medium">{user} <span className="chat-msg-date pl-1">{formatRelative(timestamp, new Date())}</span> </p>
                <p className="font-normal text-base">{content}</p>
            </div>
        </li>
    )
}

const ChatSubmessage: React.FC<Message> = ({user, content, timestamp}) => {
    return (
        <li className="chat-submessage group">
            <div className="chat-msg-date group-hover:text-muted text-transparent w-14 pl-2 mr-1 group">
                <p className="">
                    {format(timestamp, 'h:mm a')}
                </p>
            </div>
            <div>
                <p className="chat-submessage">{content}</p>
            </div>
                
        </li>
    )
}



export default ChatDirect;