import axios from "axios"
import { useState } from "react"
import {useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const AdminLogin = () => {
	const navigate=useNavigate()
	const [adminLogin, setAdminLogin] = useState({
		'email':'',
		'password': ''
	})
	const handleInput = (e)=>{
        e.persist();
        setAdminLogin({...adminLogin,[e.target.name]: e.target.value})
    }
 
	const submitAdminLogin = (e) => {
		e.preventDefault();
		 axios.post('/admin/login', {
			'email': adminLogin.email,
			'password' : adminLogin.password
		}).then(function (response) {
			localStorage.setItem('token', response.data.data)
			Swal.fire({
				icon: "success",
				text: "Login Successfully Done",
			  });
			navigate('/admin/dashboard')
			window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
			Swal.fire({
				icon: "error",
				text: "Email or password Invalid",
			  });
          });
	}

	
	return(
		<section>
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-6">
					<div className="card">
						<div className="card-header">
							<div>
								Admin Login Page
							</div>
						</div>
						<div className="card-body">
							<form onSubmit={submitAdminLogin}>
							<div className="form-group">
								<label htmlFor="">Type Here Email</label>
								<input className="form-control" onChange={handleInput} value={adminLogin.email} type="email" name="email" placeholder="type here email" />
							</div>
							<div className="form-group">
								<label htmlFor="">Type Here Password</label>
								<input onChange={handleInput} className="form-control" minLength={8} value={adminLogin.password} type="password" name="password" placeholder="type here password" />
							</div>
							<div className="text-center"><button type="submit" className='btn btn-success'>Login</button></div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default AdminLogin