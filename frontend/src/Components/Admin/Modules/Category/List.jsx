import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';


const CategoryList = () => {

    const [categories , setCategories] = useState([])
    
    useEffect(()=>{
      categoryList()
      },[])


    const categoryList = async() => {
        await axios.get('/category')
        .then(function (response) {
            console.log(response.data.data);
            setCategories(response.data.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    
    const deleteProduct = async (id) => {
      const isConfirm = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          return result.isConfirmed
        });

        if(!isConfirm){
          return;
        }

        await axios.delete(`/category/${id}`).then(({data})=>{
          Swal.fire({
              icon:"success",
              text:data.message
          })
          categoryList()
        }).catch(({response:{data}})=>{
          Swal.fire({
              text:data.message,
              icon:"error"
          })
        })
  }

/**--------------product status-------------------- */
  const productStatus = async(cat_id) => {
    axios.get(`/category/status/${cat_id}`).then((response) =>{
      Swal.fire({
        icon:"success",
        text: response.data.message
      })
      categoryList()
    })
  }

  /**----------------home page show or not ---------------- */
  const homepageShow = (cat_id) => {
    axios.get(`/category/show/home/${cat_id}`).then((res)=>{
      Swal.fire({
        icon:"success",
        text: "Home Page Show Active"
      })
      categoryList()
    }).catch((error)=> {
      console.log(error)
    })
  }
  



    console.log(categories)

    return (
        <section>



            <div class="card">
            <div class="card-body">
              <h5 class="card-title">Category List <Link className="btn btn-sm btn-success" to="/admin/category/create">Add Category</Link> </h5>

              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Category Image</th>
                    <th scope="col">Status</th>
                    <th scope="col">Show</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
            
            {
              categories.map((cat, index) => 
              
                <tr>
                  <td>{index+1}</td>
                  <td>{cat.name}</td>
                  <td> <img style={{height:"60px", width:"60px"}} src={cat.image} alt="" /> </td>
                  <td>
                  {cat.cat_status === true ? <button className="btn btn-sm btn-success" onClick={()=>productStatus(cat._id)}>Active</button> : <button className="btn btn-sm btn-info" onClick={()=>productStatus(cat._id)}>InActive</button>}
                  </td>
                  <td>
                    {cat.home === true ? <button onClick={()=>homepageShow(cat._id)}>home</button>: <button onClick={()=>homepageShow(cat._id)}>Not home</button> }
                    </td>
                  <td><Link className="btn btn-sm btn-success" to={`/admin/category/edit/${cat._id}`}>Edit</Link> 
                  <button className="btn btn-sm btn-danger" onClick={()=>deleteProduct(cat._id)}>Delete</button></td>
                  
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
export default CategoryList