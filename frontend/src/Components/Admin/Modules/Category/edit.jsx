import axios from "axios";
import { useEffect, useState } from "react"
import {useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useParams } from "react-router-dom"


const CategoryEdit = () => {
    const { id } = useParams()
    const navigate=useNavigate()
    const [name, setName] = useState("")
    const [image, setImage] = useState()
    
    const changeHandler = (event) => {
		setImage(event.target.files[0]);
	};

    const CategoryUpdate = async(e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('name', name)
        formData.append('image', image)

        await axios.put(`/category/${id}`, formData).then(({data})=>{
         
            Swal.fire({
              icon:"success",
              text:data.message
            })
            navigate("/admin/category")
          }).catch(({response})=>{
              Swal.fire({
                text:response.data.message,
                icon:"error"
              })
          })

    }

    /**category edit call api */
    const Edit = () => {
        axios.get(`/category/${id}`).then((res)=> {
            setName(res.data.data.name)
        }).catch((error)=> {
            console.log(error)
        })
    }

    useEffect(()=>{
        Edit()
    },[])

    return (
        <section>
            <div className="card">
                <div className="card-header">
                    <div className="card-title">
                        <p>Update Product</p>
                    </div>
                </div>
                <div className="card-body">
                    <form onSubmit={CategoryUpdate} method="post">
                    <div className="form-group">
                        <label htmlFor="">Category Name</label>
                        <input required type="text" name="category_name" className="form-control" value={name} id=""
                            onChange={(e)=>{
                                setName(e.target.value)
                              }}
                        />
                    </div>
                    <div className="form-gorup">
                        <label htmlFor="">Category Image</label>
                        <input required type="file" name="image" id="" className="form-control" 
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="text-center my-2"><button type="submit" className='btn btn-success'>Update Category</button></div>
                    </form>
                </div>
            </div>
        </section>
    )
}
export default CategoryEdit