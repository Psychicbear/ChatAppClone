import { useState } from "react"
import { GoPerson, GoOrganization, GoPlus, GoReply, GoComment } from "react-icons/go"

const ChatDirect = () => {
    const [sidebarActive, toggleSidebar] = useState(true);
    const changeSideBar = () => {
        toggleSidebar(!sidebarActive)
    }
    return (
        <div className="chat-view">
            <div className="chat-header">
                <div className="flex-grow">Name</div>
                <ul className="flex flex-row-reverse justify-between flex-grow flex-shrink-0">
                    <li onClick={changeSideBar}><SideBarToggle active={sidebarActive}/></li>
                    <li>buttons</li>
                    <li>buttons</li>
                    <li>buttons</li>
                </ul>
            </div>
            <div className="chat-container">
                <div className="chat-main">
                    <div className="chat-bar">
                        <ChatBar />
                    </div>
                    <ul className="chat-content pb-6">
                        <ChatSubmessage user="Riley" msg="How are you?" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                        <ChatMessage user="Riley" msg="Hello World" />
                    </ul>
                </div>
                <SideBar active={sidebarActive}/>
            </div>
        </div>
    )
}

const SideBarToggle = ({active}:any) => {
    
    return (
        <div className={`rounded-xl hover:bg-gray-300 hover:cursor-pointer 
                        ${!active ? "text-gray-500" : "text-gray-200"} group`}>
            <GoOrganization size="28"/>

            <span className="tooltip right-0 origin-top-right group-hover:scale-100">
                {active ? "Hide Members List" : "Show Members List"}
            </span>
        </div>
    )
}

const SideBar = ({active}:any) => {
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

const UserButton = ({user, status}:any) => {
    return (
        <li className="flex items-center hover:bg-gray-800 rounded-lg text-md">
            <div className="px-2 py-1"><GoPerson size="34" className="bg-gray-400 rounded-full p-1"/></div>
            <div className="flex-row pr-4">
                <p className="font-medium text-gray-300 select-text">{user}</p>
                <p className="text-xs select-text">{status}</p>
            </div>
        </li>
    )
}

const ChatBar = () => {
    let sendMessage = (e:Event) => {
        e.preventDefault();
        console.log()
    }
    return (
        <form className="chatform">
            <button className="w-12 items-center rounded-full "><GoPlus /></button>
            <textarea className="flex-grow bg-gray-600 hidden-scroll-y"></textarea>
            <button type="submit" className="w-12"><GoComment /></button>
        </form>
    )
}

const ChatMessage = ({user, msg}:any) => {
    let date = Date();
    return (
        <li className="chat-message">
            <div className="flex items-center p-3 w-16"><GoPerson size="28" /></div>
            <div className="flex-row pr-4">
                <p>{user} <span className="chat-msg-date">{date}</span> </p>
                <p className="">{msg}</p>
            </div>
        </li>
    )
}
const ChatSubmessage = ({user, msg}:any) => {
    let date = Date();
    return (
        <li className="chat-message">
            <div className="flex items-center p-3 w-16"><GoPerson size="28" /></div>
            <div className="flex-row">
                <p>{user} <span className="chat-msg-date">{date}</span> </p>
                <p className="">{msg}</p>
            </div>
        </li>
    )
}



export default ChatDirect;