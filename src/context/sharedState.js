import React, { useState, useEffect } from 'react'
import SharedContext from './SharedContext'

const SharedState = (props) => {

  const [userRole, setUserRole] = useState('USER');
  const [token, setToken] = useState();
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (window) {
      setToken(sessionStorage.getItem('token'))
      setUserRole(sessionStorage.getItem('parentId')=='0'?'Admin': 'USER')
    }
  }, [])

  return (
    <SharedContext.Provider value={{ 'userRole': userRole, 'setUserRole': setUserRole, 'token': token, 'setToken': setToken, 'isSidenavOpen': isSidenavOpen, 'setIsSidenavOpen': setIsSidenavOpen, 'loader': loader, 'setLoader': setLoader, 'rows':rows, 'setRows':setRows }}>{
      props.children
    }</SharedContext.Provider>
  )
}

export default SharedState