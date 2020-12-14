import React from 'react'
import Navbar from "../Globals/navbar";
import "../../styles/styles.scss"
const Layout = ({children}) => {
  return (
    <>
      <Navbar/>
      <div className="content">
        {children}
      </div>
    </>
  )
}

export default Layout
