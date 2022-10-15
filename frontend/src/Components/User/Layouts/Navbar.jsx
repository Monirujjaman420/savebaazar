import { useState } from "react";
import { Link } from "react-router-dom";
import Search from "../Search";

const Navbar = (props) => {
  console.log("data", props.data);
  const token = localStorage.getItem("token");

  return (
    <section>
      <div class="hero_area sub_pages">
        <header class="header_section">
          <div class="container">
            <nav class="navbar navbar-expand-lg custom_nav-container pt-3">
              <Link class="navbar-brand" to="/">
                <img src="images/logo.png" alt="" />
                <span>Save-bazar</span>
              </Link>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon"></span>
              </button>

              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <div class="d-flex m-auto flex-column flex-lg-row align-items-center">
                  <ul class="navbar-nav  ">
                    <li class="nav-item active">
                      <Link class="nav-link" to="/">
                        Home <span class="sr-only">(current)</span>
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link class="nav-link" to="/product">
                        Product
                      </Link>
                    </li>
                    {/* <li class="nav-item">
                  <Link class="nav-link" to="/user/carts"> Cart</Link>
                </li> */}
                    <li class="nav-item">
                      <Link class="nav-link" to="contact">
                        Contact us
                      </Link>
                    </li>
                  </ul>
                </div>

                <form class="form-inline  my-lg-0">
                  <ul class="navbar-nav  ">
                    <li class="nav-item">
                      <div className="d-flex">
                        <Link to={"user/carts"}>
                          <img
                            height={25}
                            className="cart"
                            src="https://imgs.search.brave.com/Yt56hkE1OVcj0mTE0tUqlO80sB7rphoB_kE4r2ZkH9k/rs:fit:800:600:1/g:ce/aHR0cHM6Ly9jZG4u/ZHJpYmJibGUuY29t/L3VzZXJzLzMxNDQ1/L3NjcmVlbnNob3Rz/LzM5NjU5NzAvZHJp/YmJibGVfdHNfcHJl/dmlldy5wbmc"
                            alt=""
                          />
                          <span>{props.data}</span>
                        </Link>
                      </div>
                    </li>
                    <li class="nav-item dropdown">
                      <a
                        class="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <img
                          height={25}
                          src="https://imgs.search.brave.com/6B_jZoNk6Va0_73dJ_WgGHyeCiYFoEdHKM8k32BFIjg/rs:fit:512:512:1/g:ce/aHR0cHM6Ly9pY29u/cy1mb3ItZnJlZS5j/b20vaWNvbmZpbGVz/L3BuZy81MTIvYXZh/dGFyK2h1bWFuK3Bl/b3BsZStwcm9maWxl/K3VzZXIraWNvbi0x/MzIwMTY4MTM5NDMx/MjE5NTkwLnBuZw"
                          alt=""
                        />
                      </a>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        {token ? (
                          <div>
                            <Link class="dropdown-item" to="user/carts">
                              Cart List
                            </Link>
                            <Link class="dropdown-item" to="user/orders">
                              Order List
                            </Link>
                            <Link class="dropdown-item" to="/logout">
                              Logout
                            </Link>
                          </div>
                        ) : (
                          <div>
                            <Link class="dropdown-item" to="/login">
                              Login
                            </Link>
                            <Link class="dropdown-item" to="/register">
                              Register
                            </Link>
                          </div>
                        )}
                        {/*                           
                          <a class="dropdown-item" href="#">Login</a>
                          <a class="dropdown-item" href="#">Register</a> */}
                      </div>
                    </li>
                  </ul>
                </form>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </section>
  );
};
export default Navbar;
