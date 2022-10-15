import axios from "axios"
import { useState } from "react"

const Contact = (props) => {
/**-------------form useState------------------ */
const [name, setName] = useState("")
const [email, setEmail] = useState("")
const [subject, setSubject] = useState("")
const [message, setMessage] = useState("")

/**-------------form submit------------ */
const ContactStore = (e) => {
    e.preventDefault();
    const formData = new FormData
    formData.append("name", name)
    formData.append("email", email)
    formData.append("subject", subject)
    formData.append("message", message)

    axios.post('/contact', formData).then((res)=> {
        console.log(res)
    }).catch((error)=>{
        console.log(error)
    })

}
    return (
        <section className="container">
            <div className="row">
                <div className="col-md-8 col-lg-8 col-sm-12">
                    <div className="card my-5">
                        <div className="card-header">
                            <h3>Contact-us</h3>
                        </div>
                        <div className="card-body">
                            <form action="" onSubmit={ContactStore}>
                                <div className="form-group">
                                    <label htmlFor="">Enter Your Full Name</label>
                                    <input required type="text" className="form-control" name="" id=""
                                    onChange={(e)=> {
                                        setName(e.target.value)
                                    }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Enter Your E-mail</label>
                                    <input required type="email" className="form-control" name="" id="" 
                                    onChange={(e)=> {
                                        setEmail(e.target.value)
                                    }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Enter Your Subject</label>
                                    <input required type="text" className="form-control" name="" id="" 
                                    onChange={(e)=> {
                                        setSubject(e.target.value)
                                    }}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="">Message</label>
                                    <textarea required name="" id="" cols="10" className="form-control" rows="4"
                                    onChange={(e)=> {
                                        setMessage(e.target.value)
                                    }}
                                    ></textarea>
                                </div>

                                <div className="form-group text-center">
                                    <input type="submit" className="btn btn-success" value="Submit" name="" id="" />
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-12 ">
                    <div className="card my-5">
                        <div className="card-header">
                            <h3>Information</h3>
                        </div>
                        <div className="card-body" style={{ marginTop : "50%", marginBottom: "50%" }}>
                           <p> <span><strong>Call: 01932832322</strong></span></p> 
                           <p> <span><strong>E-mail: Monir@gmail.com</strong></span></p>
                            <span><strong>Location: Daffodil Internation University, Ashulia, Saver</strong></span> <br />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Contact