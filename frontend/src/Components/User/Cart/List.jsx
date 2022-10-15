import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const token = localStorage.getItem('token');

const CartList = () => {
 
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }
 

    const [carts, setCart] = useState([])

    
    
    /**auth user cart list show */
    const CartListItem = async() => {
        const api = '/cart'
        axios.get(api, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res)=>{
            console.log(res.data.data);
            setCart(res.data.data)
        }).catch((error) => {
            console.log("e",error);
        })
    }

    /**auth user can cart remove */
    const removeCart = async(id) =>{
        axios.delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${window.token}` }
    }).then((res) => {
            CartListItem()
        }).catch((error)=>{
            console.log(error)
        })
    }

    /**increment cart quantity*/
    const increment = (id) => {
        axios.get(`/cart/increment/${id}`,config).then((res) => {
            CartListItem()
        }).catch((error) => {
            console.log(error)
        })
    }

    /**decrement cart quantity*/
    const decrement = (id) => {
        axios.get(`/cart/decrement/${id}`,config ).then((res)=> {
            CartListItem()
        }).catch((error)=> {
            console.log(error)
        })
    }

    useEffect(()=>{
        CartListItem()
    },[])


    let total = 0;
    return (
        <section className="container my-5">
            <div className="card">
                <div className="card-header">
                    <h2>Carts List</h2>
                </div>
                <div className="card-body">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                carts.map((cart, index) =>
                                
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{cart.product_id ? cart.product_id.name : ''}</td>
                                    <td> { cart.product_id ? cart.product_id.price : ''} Taka</td>
                                    <td><button onClick={()=>decrement(cart._id)}>-</button> <span>{cart.quantity}</span> <button onClick={()=>increment(cart._id)}>+</button></td>
                                    <span style={{ display: "none" }}>{ total += cart.product_id ? cart.product_id.price * cart.quantity : ''    }</span>
                                    <td>
                                        <button className="btn btn-sm btn-danger" onClick={()=>removeCart(cart._id)}>Remove</button>
                                    </td>
                                </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="float-right">
                            <strong>Sub Total Price: {total}Tk </strong><br />
                            <strong>Total Price: {total}Tk </strong><br />
                            <strong className="text-dark"><Link  to="/user/checkout" className="text-dark btn btn-outline-primary">Go To Checkout</Link></strong>
                    </div>
                    
                </div>
                
            </div>
        </section>
    )
}
export default CartList