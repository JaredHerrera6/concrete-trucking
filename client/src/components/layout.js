import React from 'react'
import Navbar from './navbar'

//THe children of the layout is goin gto be the page 
const Layout = ({children}) => {
  return ( 
    <div>
      <Navbar/>
        <div className="container">{children}</div>
    </div>
  )
}

export default Layout