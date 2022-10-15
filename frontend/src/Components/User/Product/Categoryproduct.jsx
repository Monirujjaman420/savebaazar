import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CategoryProduct = () => {
  const { id } = useParams();
  const [search, setSearch] = useState("");
  const [categories, setCategory] = useState([""]);
  const [products, setProduct] = useState([""]);
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [totalpage, setTotalPage] = useState([]);
  const [currentpage, setCureentPage] = useState([]);

  /**----------product paginate ---------------- */
  let paginate = [];
  for (let index = 0; index < totalpage; index++) {
    paginate.push(
      <div className="">
        <li class="page-item">
          <button className="page-link" onClick={() => productList(index + 1)}>
            {index + 1}
          </button>
        </li>
      </div>
    );
  }

  const previce = () => {
    productList(currentpage - 1);
  };
  const next = () => {
    productList(currentpage + 1);
  };

  const AllCategory = () => {
    axios
      .get("/category")
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**search */
  const SearchFilter = () => {
    axios
      .get(`/product/search/${search}`)
      .then((res) => {
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const CategoryWaysProduct = () => {
    axios
      .get(`/category/product/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**-------------------product list with pagination ---------------- */
  const productList = async (Pagenumber) => {
    axios
      .get(`/product?page=${Pagenumber}`)
      .then((res) => {
        console.log("pages total", res.data.totalPage);
        console.log("currentPage total", res.data.currentPage);
        console.log("itemPerPage total", res.data.itemPerPage);
        setProduct(res.data.data);
        setTotalPage(res.data.totalPage);
        setCureentPage(res.data.currentPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* category click after the query from product table then show the response data */
  const cat = (id) => {
    axios
      .get(`/category/product/${id}`)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    AllCategory();
    CategoryWaysProduct();
    // AllProduct()
    productList();
  }, []);

  return (
    <div className="my-5 container">
      <section className="row">
        <div className="col-md-3 col-lg-3 col-sm-4">
          <h3>Categories</h3> <hr />
          <ul style={{ listStyle: "none" }}>
            {categories.map((category, index) => (
              <li>
                <a onClick={() => cat(category._id)}>
                  {" "}
                  <img
                    src={category.image}
                    height={20}
                    width={20}
                    alt=""
                  />{" "}
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-9 col-lg-9 col-sm-8">
          <h2>Products </h2> <hr />
          {/* <input
            placeholder="search"
            type="text"
            onClick={SearchFilter()}
            className="form-control my-2"
            name=""
            id=""
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          /> */}
          <div className="row">
            {products.length > 1
              ? products.map((product, index) => (
                  <div className="col-sm-12 col-md-4 col-lg-4 product">
                    <Link to={`/product/${product._id}`}>
                      <div className="card" style={{ width: "17rem" }}>
                        <img
                          height={200}
                          className="card-img-top"
                          src={product.image}
                          alt="Card image cap"
                        />
                        <div className="card-body">
                          <div className="row text-dark">
                            <div className="col-md-8 col-lg-8 col-sm-8 font-weight-bold">
                              {product.name}
                            </div>
                            <div className="col-md-4 col-lg-4 col-sm-4">
                              {" "}
                              <strong>৳</strong> {product.price}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="stoke">Stock</div>
                    </Link>
                  </div>
                ))
              : "Select Your Product Category"}
          </div>
        </div>
        <div className="" style={{ marginLeft: "45%" }}>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item  ">
                <button class="page-link" onClick={() => previce()}>
                  Previous
                </button>
              </li>

              {paginate}

              <li class="page-item">
                <button class="page-link" onClick={() => next()}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
};
export default CategoryProduct;
