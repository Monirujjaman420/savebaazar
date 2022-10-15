import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
const token = localStorage.getItem('token');

const UserOrderLists =  () => {

    /**Order List useState */
    const [orders, setOrder] = useState([])

    /**order api call */
    const OrderListData = () => {
        const api = '/order'
        axios.get(api, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            console.log(res.data.data);
            setOrder(res.data.data)
        }).catch((error) => {
            console.log("e",error);
        })
    }


    /**order delete  */
    const OrderDelete = (id) =>
    {
        axios.delete(`/order/destroy/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            console.log(res.data.data);
            OrderListData()
        }).catch((error) => {
            console.log("e",error);
        })
    }

    /**useEffect */
    useEffect(()=>{
        OrderListData()
    },[])

    let total = 0;
    return(
        <section className="container my-5">
            <div className="card">
                <div className="card-header">
                    <h2>Order List</h2>
                </div>
                <div className="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.map((order, index) =>
                                
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{order.f_name}</td>
                                    <td>{order.l_name}</td>
                                    <td>{order.email}</td>
                                    <td>{order.phone}</td>
                                    <td>
                                        {
                                            order.order_Status === true ? "Approved" : "Pending"
                                        }
                                    </td>
                                    <td>
                                       <button className="btn btn-sm btn-danger" onClick={(e)=>OrderDelete(order._id)}>Delete</button>
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
export default UserOrderLists