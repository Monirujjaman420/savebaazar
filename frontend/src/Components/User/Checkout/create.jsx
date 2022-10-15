import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const token = localStorage.getItem("token");

const CheckoutCreate = () => {
  /**user information */
  const [user, setUser] = useState('')
  console.log("asdfa",user.name)
  /**token store */
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const navigate = useNavigate();

  /**user information with token */
  const UserInformation = async () => {
    const api = "/user/profile";
    axios
      .get(api, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.data)
      })
      .catch((error) => {
        console.log("e", error);
      });
  };


  const [email, setEmail] = useState("");
  const [f_name, setF_name] = useState("");
  const [l_name, setL_name] = useState("");
  const [location, setLocation] = useState("");
  const [location2, setLocation2] = useState("");
  const [postCode, setPostCode] = useState("");
  const [phone, setPhone] = useState("");
  const [transection_id, setTransection_id] = useState("");
  const [payment_type, setPayment_type] = useState("");
  const [payment_number, setPayment_number] = useState("");
  const [note, setNote] = useState("");



  /**order form submit */
  const Checkout = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", user.email);
    formData.append("f_name", user.name);
    formData.append("l_name", l_name);
    formData.append("location", location);
    formData.append("location2", location2);
    formData.append("postCode", postCode);
    formData.append("phone", phone);
    formData.append("transection_id", transection_id);
    formData.append("payment_type", payment_type);
    formData.append("payment_number", payment_number);
    formData.append("note", note);

    
    await axios
      .post(`/order`, formData,  {
        headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: "Your order has been successully, we this order deleverd to 3 days",
        });
        navigate("/");
      })
      .catch(({ response }) => {
        Swal.fire({
          text: response.data.message,
          icon: "error",
        });
      });
  };

  /**auth user cart list show */
  const [carts, setCart] = useState([]);
  let total = 0;
  const CartListItem = async () => {
    const api = "/cart";
    axios
      .get(api, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.data);
        setCart(res.data.data);
      })
      .catch((error) => {
        console.log("e", error);
      });
  };

  /**auth user can cart remove */
  const removeCart = async (id) => {
    axios
      .delete(`/cart/${id}`, {
        headers: { Authorization: `Bearer ${window.token}` },
      })
      .then((res) => {
        CartListItem();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**increment cart quantity*/
  const increment = (id) => {
    axios
      .get(`/cart/increment/${id}`, config)
      .then((res) => {
        CartListItem();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**decrement cart quantity*/
  const decrement = (id) => {
    axios
      .get(`/cart/decrement/${id}`, config)
      .then((res) => {
        CartListItem();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    CartListItem();
    UserInformation();
  }, []);

  return (
    <section className="my-5 container">
      <div className="">
        <div className=""></div>
        <div className="">
          <div className="row">
            <div className="col-md-8 col-lg-8 col-sm-12">
              <h3>Checkout</h3>
              <form action="" onSubmit={Checkout}>
                <div className="row">
                  <div className="col-md-12 col-lg-12 col-ms-12 my-2">
                    <div className="form-gorup">
                      <input
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        value={user.email}
                        required
                        type="text"
                        className="form-control"
                        placeholder="E-mail"
                        name="email"
                        id=""
                      />
                    </div>
                  </div>

                  <div className="col-md-6 my-2">
                    <div className="form-gorup">
                      <input
                        onChange={(e) => {
                          setF_name(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        placeholder="First Name"
                        required
                        name="f_name"
                        value={user.name}
                        id=""
                      />
                    </div>
                  </div>

                  <div className="col-md-6 my-2">
                    <div className="form-gorup">
                      <input
                        onChange={(e) => {
                          setL_name(e.target.value);
                        }}
                        type="text"
                        className="form-control"
                        required
                        placeholder="Last Name (optional)"
                        name="l_name"
                        id=""
                      />
                    </div>
                  </div>

                  <div className="col-md-12 my-2">
                    <div className="form-gorup">
                      <input
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                        type="text"
                        required
                        className="form-control"
                        placeholder="Address"
                        name="location"
                        id=""
                      />
                    </div>
                  </div>

                  <div className="col-md-6 my-2">
                    <div className="form-gorup">
                      <input
                        onChange={(e) => {
                          setLocation2(e.target.value);
                        }}
                        type="text"
                        required
                        className="form-control"
                        placeholder="Address 2 (option)"
                        name="location2"
                        id=""
                      />
                    </div>
                  </div>

                  <div className="col-md-6 my-2">
                    <div className="form-gorup">
                      <input
                        onChange={(e) => {
                          setPostCode(e.target.value);
                        }}
                        required
                        type="text"
                        className="form-control"
                        placeholder="Post Code"
                        name="postCode"
                        id=""
                      />
                    </div>
                  </div>

                  <div className="col-md-12 my-2">
                    <div className="form-gorup">
                      <input
                        type="text"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                        required
                        className="form-control"
                        placeholder="Phone Number"
                        name="phone"
                        id=""
                      />
                    </div>
                  </div>

                

                  <div className="col-md-6 my-2">
                    <div className="form-gorup">
                      <select className="form-control" name="payment_type" id=""
                      onChange={(e) => {
                        setPayment_type(e.target.value);
                      }}
                      >
                        <option value="Bkash">Bkash</option>
                        <option value="Rocket">Rocket</option>
                        <option value="Nagud">Nagud</option>
                      </select>
                    </div>
                  </div>


                  <div className="col-md-6 my-2">
                    <div className="form-gorup">
                      <input
                        type="text"
                        onChange={(e) => {
                          setTransection_id(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Transection ID"
                        name="transection_id"
                        required
                        id=""
                      />
                    </div>
                  </div>

                  <div className="col-md-6 my-2">
                    <div className="form-gorup">
                      <input
                        type="number"
                        onChange={(e) => {
                          setPayment_number(e.target.value);
                        }}
                        className="form-control"
                        placeholder="Payment Number"
                        name="payment_number"
                        required
                        id=""
                      />
                    </div>
                  </div>

                  <div className="col-md-12 my-2">
                    <div className="form-gorup">
                      <textarea
                        name="note"
                        placeholder="Note"
                        onChange={(e) => {
                          setNote(e.target.value);
                        }}
                        id=""
                        className="form-control"
                        cols="8"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>

                  <div className="text-center my-3">
                    <input
                      type="submit"
                      className="btn btn-success"
                      value="Checkout"
                      name=""
                      id=""
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4 col-lg-4 col-sm-12">
              <h3>Cart Items</h3>
              {carts.map((cart, index) => (
                <div className="my-4">
                  <div className="col-md-12 col-lg-12 col-sm-12">
                    <strong>
                      Name: {cart.product_id ? cart.product_id.name : ""}
                    </strong>
                    <br />
                    <strong>
                      Price : {cart.product_id ? cart.product_id.price : ""}
                    </strong>
                    <br />
                    <span style={{ display: "none" }}>
                      {
                        (total += cart.product_id
                          ? cart.product_id.price * cart.quantity
                          : "")
                      }
                    </span>
                    <strong>
                      {" "}
                      <button onClick={() => decrement(cart._id)}>
                        -
                      </button>{" "}
                      <span>{cart.quantity}</span>{" "}
                      <button onClick={() => increment(cart._id)}>+</button>
                    </strong>
                  </div>
                </div>
              ))}

              <div class="d-flex">
                <div class="p-2 font-weight-bold">Sub Total</div>
                <div class="ml-auto p-2 font-weight-bold">{total}Tk</div>
              </div>

              <div class="d-flex">
                <div class="p-2 font-weight-bold"> Total</div>
                <div class="ml-auto p-2 font-weight-bold">{total}Tk</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default CheckoutCreate;
