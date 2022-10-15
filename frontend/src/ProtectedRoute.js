import React from 'react'
import jwt_decode from "jwt-decode";

	import {Navigate, Outlet} from 'react-router-dom'
	

	const useAuth=()=>{
		const admin=localStorage.getItem('token')
		const decoded = jwt_decode(admin);
		const isAdmin = decoded.role	
		// if("admin" == decoded.role){
			// 	localStorage.setItem('token', response.data.data)
			// 	navigate('/dashboard')
			// }
	  if(isAdmin === "admin"){ 
	    return true
	  } else {
	    return false
	  }
	} 
	

	const  ProtectedRoutes=(props:any) =>{
	

	  const auth=useAuth()
	

	  return auth?<Outlet/>: <Navigate to="/admin/login"/>
	}
	

	export default ProtectedRoutes;