import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const OrderShow = () => {
    let total = 0
    const [order, setOrder] = useState([])
    const [orderItems, setOrderItems] = useState([''])
    const { id } = useParams()
    const orderDetails = async () => {
        await axios.get(`/admin/order/${id}`).then((res) => {
            console.log('only order', res.data.order)
            setOrder(res.data.order)
            console.log('only order item', res.data.orderItems)
            setOrderItems(res.data.orderItems)
        })
    }   
    const t = 3;
    useEffect(() => {
        orderDetails()
    }, [])

    return (
        <section>
            <div className="row">
                <h3>Order Details History: </h3>
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            User Information
                        </div>
                        <div className="card-body">
                            <span><strong>Name: </strong>{order.f_name + order.l_name}</span><br />
                            <span><strong>Email: </strong>{order.email}</span><br />
                            <span><strong>Phone: </strong>{order.phone}</span><br />
                            <span><strong>Location: </strong>{order.location}</span><br />
                            <span><strong>Location2: </strong>{order.location2}</span><br />
                            <span><strong>Post Code: </strong>{order.postCode}</span><br />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-6 col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            Pyments History
                        </div>
                        <div className="card-body">
                            {/* <span><strong>Payment Type: </strong>{order.payment_type}</span><br /> */}
                            <span><strong>Payment Number: </strong>{order.payment_number}</span><br />
                            <span><strong>Transection ID: </strong>{order.transection_id}</span><br />
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <div className="card">
                    <div className="card-header">
                        Order Items List
                    </div>
                    <div className="card-body">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">SL</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Sub Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orderItems.map((item, index)=>
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.product_id ? item.product_id.name : "" }</td>
                                        <td>{item.product_id ? item.product_id.price: ""} Taka</td>
                                        <td>{item.quantity}qty</td>
                                        <span style={{ display: "none" }}>{ total += item.product_id ? item.product_id.price * item.quantity : ''    }</span>
                                        <td>{item.product_id ? item.product_id.price * item.quantity : "0" }Tk</td>
                                       
                                    </tr>
                                    )
                                }
                            </tbody>
                            <tfoot className="my-2">
                                Total Amount : {total}Tk
                            </tfoot>
                        </table>
                    </div>
                </div>
            </section>
        </section>
    )
}
export default OrderShow