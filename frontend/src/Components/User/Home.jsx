import axios from "axios"
import {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import Slider from "./Layouts/Slider"
import Footer from './Layouts/Footer'
var moment = require('moment'); 

const Home = () => {

  const [products , setProduct] = useState([])
  const [categories , setCategory] = useState([])
  const [categoryProduct , setCategoryProduct] = useState([])
  const [totalpage, setTotalPage] = useState([])
  const [currentpage, setCureentPage] = useState([]) 

  /**-------------------product list with pagination ---------------- */
  const productList = async(Pagenumber) => {
    axios.get(`/product?page=${Pagenumber}`).then((res)=>{
      console.log('pages total',res.data.totalPage);
      console.log('currentPage total',res.data.currentPage);
      console.log('itemPerPage total',res.data.itemPerPage);
      setProduct(res.data.data)
      setTotalPage(res.data.totalPage)
      setCureentPage(res.data.currentPage)
    }).catch((error) =>{
      console.log(error)
    })
  }

  /**-------------------product list with out pagination------------------------- */
  const CategoryProducts = async() => {
    axios.get('/category/product').then((res)=> {
      setCategoryProduct(res.data.data)
    }).catch((error) => {
      console.log(error);
    })
  }


  /**--------category list show--------------- */
  const CategoryList = () =>{
    axios.get('/category').then((res)=>{
      setCategory(res.data.data)
    }).catch((error)=>{
      console.log(error);
    })
  }

  
  /**----------product paginate ---------------- */
  let paginate = [];
  for (let index = 0; index < totalpage; index++) {
      paginate.push(
          <div className=''>
              <li class="page-item"><button className="page-link" onClick={()=>productList(index+1) } >{index +1}</button></li>
          </div>
      )
  }

  const previce = () => {
    productList(currentpage - 1)
  }
  const next = () =>{
    productList(currentpage+1)
  } 


  /**--------------product list show with pagiate----------------- */
  const allProduct = () => {
    axios.get('/product/').then((res)=>{
      console.log('pr', res.data.data)
      setProduct(res.data.data)
      console.log('pr', res.data.data)
    }).catch((error) => {
      console.log(error)
    })
  }


/**------------------------useEffect ------------------------------*/
  useEffect(()=>{
    productList()
    CategoryList()
    allProduct()
    CategoryProducts()
  },[])


  return (
    <section>
      <Slider></Slider>
      <section className=" layout_padding ">
        <div className="container">
          <h2 className="text-center">Our Categories</h2>
          <p className="text-center">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have
          </p>

          <div className="row">
            {
              categories.map((category, index) => 
              <div className="col-md-2 my-2">
                <div className="card">
                  <img height={80} className="card-img-top" src={category.image} alt="Card image cap" />
                  <p className="my-2 text-center"><Link className="text-dark" to={`/category/product/list/${category._id}`}>{category.name}</Link></p>
                </div>
              </div>
              )
            }
            
          </div>
        </div>
      </section>


      <section>
        {
          categories.map((category, index)=>
          category.home === true ? 
            <div className="container">
              <div className=" text-light p-2" style={{ borderRadius: "5px", background: "#fc5d35" }}>
               <h3> {category.name}</h3>
              </div>
              <div className="card-body">
              <div className="row">
                {
                  categoryProduct.map((product, index) => 
                    category._id == product.category_id ?
                        <div className="col-sm-12 col-md-3 col-lg-3 product">
                      <Link to={`/product/${product._id}`}>
                      <div className="card" style={{ width: "17rem" }}>
                        <img height={200} className="card-img-top" src={product.image} alt="Card image cap" />
                        <div className="card-body">
                          <div className="row text-dark">
                            <div className="col-md-8 col-lg-8 col-sm-8 font-weight-bold">{product.name}</div>
                            <div className="col-md-4 col-lg-4 col-sm-4"> <strong>৳</strong> {product.price}</div>
                          </div>
                          
                        </div>
                      </div>
                      <div className="stoke">
                        Stock
                      </div>
                      </Link>
                        </div>
                    :""
                  )
                }
                </div>
              </div>
            </div>
            : ""
            
          )
        }
      </section>

      <section className="fruit_section">
        <div className="container">
          <h2 className="custom_heading">Just For You</h2>
          <p className="custom_heading-text">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have
          </p>
          <div className="row">
            
           {
             products.map((product, index) => 
             <div className="col-sm-12 col-md-3 col-lg-3 product">
             <Link to={`/product/${product._id}`}>
              <div className="card" style={{ width: "17rem" }}>
                <img height={200} className="card-img-top" src={product.image} alt="Card image cap" />
                <div className="card-body">
                  <div className="row text-dark">
                    <div className="col-md-8 col-lg-8 col-sm-8 font-weight-bold">{product.name}</div>
                    <div className="col-md-4 col-lg-4 col-sm-4"> <strong>৳</strong> {product.price}</div>
                  </div>
                  
                </div>
              </div>
              <div className="stoke">
                Stock
              </div>
             </Link>
            </div>
             )
           }
          </div>
         
               <div className="" style={{ marginLeft: "45%" }}>
                 <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item  "><button class="page-link" onClick={()=>previce()} >Previous</button></li>

                     {paginate} 
                     
                    <li class="page-item"><button class="page-link" onClick={()=>next()} >Next</button></li>
                  </ul>
                </nav>
               </div>
            
            
        </div>
      </section>
    </section>
  )
}
export default Home