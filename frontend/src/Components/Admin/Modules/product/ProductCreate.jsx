import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ProductCreate = () => {
    const navigate=useNavigate()
    const [category, setCategory] = useState([])
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [category_id, setCategory_id] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState()

    const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};
 
    const ProductStore = async(e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', name)
        formData.append('image', image)
        formData.append('price', price)
        formData.append('category_id', category_id)
        formData.append('description', description)

        await axios.post(`/admin/product`, formData).then(({data})=>{
            Swal.fire({
              icon:"success",
              text:data.message
            })
            navigate("/admin/product")
          }).catch(({response})=>{
              Swal.fire({
                text:response.data.message,
                icon:"error"
              })
          })

    }

    useEffect(()=>{
        CategoryList()
    },[])
    const CategoryList = async() => {
        axios.get('/category').then((response) =>{
            console.log(response.data.data)
            setCategory(response.data.data)
        }).catch((error)=>{
            console.log(error)
        })
    }

    

    return (
        <section>
            <div className="card">
                <div className="card-header">
                    Create New Product <Link to="/admin/product"></Link>
                </div>

                <div className="card-body">
                    <form action="" onSubmit={ProductStore} className="">
                        <div className="row">
                            <div className="col-md-8 my-2">
                                <label htmlFor="">Product Name <span className="text-danger">*</span></label>
                                <input required type="text" name="name" id="" value={name} placeholder="Product Name" className="form-control"
                                onChange={(e)=>{
                                    setName(e.target.value)
                                  }}
                                />
                            </div>
                            <div className="col-md-4 my-2">
                                <label htmlFor="">Product Price</label>
                                <input required type="number" name="price" value={price} className="form-control" placeholder="Product Price" id="" 
                                onChange={(e)=>{
                                    setPrice(e.target.value)
                                  }}
                                />
                            </div>
                            <div className="col-md-6 my-2">
                                <label htmlFor="">Select Category</label>
                                <select required name="category_id" className="form-control" value={category_id} id=""
                                 onChange={(e)=>{
                                    setCategory_id(e.target.value)
                                  }}
                                >
                                    <option value="">--Select Category--</option>
                                    {
                                        category.map((cat, index) => 
                                            <option value={cat._id}>{cat.name}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-md-6 my-2">
                                <label htmlFor="">Product Image</label>
                                <input required type="file" name="image" className="form-control" id=""
                                onChange={changeHandler}
                                />
                            </div>
                            <div className="col-md-12 my-2">
                                <label htmlFor="">Description</label>
                                <textarea required name="description" value={description} className="form-control" placeholder="Product Description" id="" cols="10" rows="5"
                                onChange={(e)=>{
                                    setDescription(e.target.value)
                                  }}
                                ></textarea>
                            </div>
                            
                        </div>
                        <div className="text-center my-2">
                            <input type="submit" value="Create New product" className="text-center btn btn-success" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default ProductCreate