import { FormEvent, useState } from "react"
import { Outlet } from "react-router-dom"
import ContextBar from "../global/ContextBar"
import ControlSection from "../global/ControlSection"

const Dashboard: React.FC<{}> = ({}) => {
  return (
    <>
        <ContextBar />
        <div className="content-view">
            <Outlet />
        </div>
        
    </>
  )
}

export default Dashboard