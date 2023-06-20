import { FormEvent, useState } from "react"
import { Outlet } from "react-router-dom"
import ContextBar from "../global/ContextBar"
import SideBar from "../global/SideBar"

const Channel: React.FC<{}> = ({}) => {
  return (
    <>
        <SideBar />
        <ContextBar />
        <Outlet />
    </>
  )
}

export default Channel