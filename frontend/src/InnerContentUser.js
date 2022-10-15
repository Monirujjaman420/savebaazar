import { Outlet } from 'react-router-dom'
import Footer from './Components/User/Layouts/Footer';
import Navbar from './Components/User/Layouts/Navbar';
import { useEffect, useState } from "react"
import axios from "axios"
const token = localStorage.getItem('token');

import('https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/assets/owl.carousel.min.css')
import('../src/Components/User/assets/css/bootstrap.css')
import('https://fonts.googleapis.com/css?family=Poppins:400,700&display=swap')
import('../src/Components/User/assets/css/style.css')
import('../src/Components/User/assets/css/responsive.css')



 


const InnerContentUser = () => {
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
      CartNumber()
    },[])

  return <div className='inner-content'>
    <Navbar data={cart}></Navbar>
    <Outlet />
    <Footer></Footer>
  </div>
}

export default InnerContentUser;