import React from 'react'
import jwt_decode from "jwt-decode";
	

	import {Navigate, Outlet} from 'react-router-dom'
	

	const useAuth=()=>{
		const admin=localStorage.getItem('token')
		const decoded = jwt_decode(admin);
		const isUser = decoded.role	
		if(isUser === "user"){ 
			return true
		  } else {
			return false
		  }
	} 
	

	const  ProtectedRoutesUser=(props:any) =>{
	

	  const auth=useAuth()
	

	  return auth ? <Outlet/> : <Navigate to="/login"/>
	}
	

	export default ProtectedRoutesUser;