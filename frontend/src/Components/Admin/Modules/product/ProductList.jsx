import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const ProductList = () => {

    const [Products, SetProduct] = useState([''])
    const AllProduct = () =>{
        axios.get('/admin/product').then((response)=>{
            SetProduct(response.data.data)
            console.log('asdfasd', response.data.data)
        }).catch((error)=>{
            console.log(error)
        })
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
  
          await axios.delete(`/admin/product/${id}`).then(({data})=>{
            Swal.fire({
                icon:"success",
                text:data.message
            })
            AllProduct()
          }).catch(({response:{data}})=>{
            Swal.fire({
                text:data.message,
                icon:"error"
            })
          })
    }

    useEffect(()=>{
        AllProduct()
    },[])

    return (
        <section>
            <div className="card">
                <div className="card-header">
                    Product List <Link to="/admin/product/create" className="btn btn-sm btn-success">Create Product</Link>
                </div>
                <div className="card-body">
                <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Index</th>
                        <th scope="col">Name</th>
                        <th scope="col">Image</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead> 
                <tbody>
                    {
                        Products.map((p, index) =>
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{p.name}</td>
                            <td><img style={{height:"60px", width:"60px"}} src={p.image} alt="" /> </td>
                            <td>
                                <Link className="btn btn-sm btn-success" to={`/admin/product/edit/${p._id}`}>Edit</Link>
                                <button onClick={()=>deleteProduct(p._id)} className="btn btn-sm btn-danger">Delete</button>
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
export default ProductList