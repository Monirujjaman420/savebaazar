import axios from "axios"
import { useEffect, useState } from "react"
import {Link, useParams} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from "../Layouts/Navbar";

const token = localStorage.getItem('token');


const ProductDetail = () => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const navigate = useNavigate()
    const {id} = useParams()
    const [product, setProduct] = useState([])
    console.log('pras',product)
    

    /**total cart item number */
  const [cart, setCart] = useState('')
  const CartNumber = () => {
      axios.get('/cart/number',{
        headers: { Authorization: `Bearer ${token}` }
    }).then((res)=> {
      setCart(res.data.data)
    }).catch((error)=> {
      console.log(error)
    })
  }

    useEffect(()=>{
        SingleProduct()
        CartNumber()

      },[])
      
    const SingleProduct = async()=>{
        await axios.get(`/product/${id}`).then((res) => {
            console.log('name', res.data.data[0])
            setProduct(res.data.data[0])
        }).catch((error) =>{
            console.log(error);
        })
    }

    const AddToCart = (id) =>{
        const api = `/cart/${id}`
        axios.post(api, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) =>{
            <Navbar title="hello"/>
            Swal.fire({
              icon:"success",
              text: response.data.message
            });
            
            navigate('/')
          }).catch((error)=> {
              console.log(error)
          })
    }


    return (
        <section className="my-5 container">
            <div className="row ">
                {/* <div className="col-md-4 col-lg-4 col-sm-12">
                    
                </div>
                <div className="col-md-8 col-lg-8 col-sm-12">
                    <p><strong>Product Name: </strong> {product.name}</p>
                    <p><strong>Product Price: </strong> {product.price}</p>
                    <p><strong>Product Category: </strong> {product.category_id}</p>
                    <p><strong>Product Description: </strong> {product.description}</p>
                    <a href="">Add-to-card</a>
                </div> */}
                <div className="col-md-4 col-lg-4">
                <img src={product.image} style={{height: "350px", width:"100%"}} alt="" />
                </div>
                <div className="col-md-8 col-lg-8">
                    <p><strong>Product Name: </strong> {product.name}</p>
                    <p><strong>Product Price: </strong> {product.price}</p>
                    <p><strong>Product Category: </strong> {product.category_id}</p>
                    <p><strong>Product Description: </strong> {product.description}</p>
                    <button onClick={()=>AddToCart(product._id)} className="btn btn-sm btn-success">Add To Cart</button>         
                </div>
            </div>
        </section>
    )
}
export default ProductDetail