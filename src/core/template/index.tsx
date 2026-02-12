import React from "react"
import { Sidebar } from "./components/sidebar/sidebar"

interface ITemplateProps {
  children: React.ReactNode
}

const Template: React.FC<ITemplateProps> = ({ children }) => {

  return (
    <div className="flex flex-row w-full h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full h-full overflow-auto p-6">
        {children}
      </div>
    </div>
  )
}

export default Template;