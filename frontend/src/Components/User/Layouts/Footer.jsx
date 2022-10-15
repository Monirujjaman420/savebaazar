import {Link} from "react-router-dom"
const Footer = () => {
    return (
        <section>
            <section className="info_section layout_padding bg-light">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>
                Our Motivation
              </h5>
              <ul>
                <li className="h3">
                  Save-bazar, save-life
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>
                Quick Links
              </h5>
              <ul>
                <li>
                  <Link to="/" >Home</Link>
                </li>
                <li>
                <Link to="/product" >Product</Link>
                </li>
                <li>
                <Link to="/contact" >Contact Us</Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4">
              <div className="social_container">
                <h5>
                  Follow Us
                </h5>
                <div className="social-box">
                  <a href="">
                    <img src="images/fb.png" alt="" />
                  </a>

                  <a href="">
                    <img src="images/twitter.png" alt="" />
                  </a>
                  <a href="">
                    <img src="images/linkedin.png" alt="" />
                  </a>
                  <a href="">
                    <img src="images/instagram.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="subscribe_container">
                <h5>
               Contact Us
                </h5>
               <div>
                Emaill:Monir35-367@diu.edu.bd
               </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </section>
    )
}
export default Footer