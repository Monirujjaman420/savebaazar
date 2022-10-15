import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2";

const AdminContact = () => {
    /**-------------contact list------------- */
    const [contacts, setContact] = useState([''])
    const allContact = async() => {
        await axios.get('/admin/contact').then((res) => {
            setContact(res.data.data)            
        }).catch((error) => {
            console.log(error);
        })
    }

    /**----------contact status ----------------- */
    const ContactStatus = async(id) => {
        await axios.get(`/admin/contact/status/${id}`).then((res)=>{
            Swal.fire({
				icon: "success",
				text: "Contact Status Changes",
			  });
            allContact()
        }).catch((error)=> {
            console.log(error);
        })
    }

    /*-----------contact delete ------------------- */
    const contactDelete = (id) => {
        axios.delete(`/admin/contact/${id}`).then((res)=>{
            Swal.fire({
				icon: "success",
				text: "Contact Deleted Successfully",
			  });
            allContact()
        }).catch((error)=> {
            Swal.fire({
				icon: "error",
				text: "someting went wrong",
			  });
        })
    }
    /**-------------useEffect------------- */
    useEffect(()=>{
        allContact()
    },[])

    return (
        <section>
            <div className="card">
                <div className="card-header">
                    <h3>Contact List</h3>
                </div>
                <div className="card-body">
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Message</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {
                           contacts.map((contact, index) => 
                            <tr>
                                <th scope="row">{contact.name}</th>
                                <td>{contact.email}</td>
                                <td>{contact.subject}</td>
                                <td>{contact.message}</td>
                                <td>{contact.contactStatus === true ? <button className="btn btn-sm btn-success" onClick={(e)=>ContactStatus(contact._id)}>Active</button> : <button className="btn btn-sm btn-danger" onClick={(e)=>ContactStatus(contact._id)}>InActive</button> }</td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={()=>contactDelete(contact._id)}>Delete</button>
                                </td>
                            </tr>
                           )
                       }
                    </tbody>
                </table>
                </div>
            </div>
        </section>
    )
}

export default AdminContact