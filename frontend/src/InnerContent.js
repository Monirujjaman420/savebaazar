import { Outlet } from 'react-router-dom'
import AdminFooter from './Components/Admin/Layouts/Footer';
import AdminNavbar from './Components/Admin/Layouts/Navbar';
import AdminSidebar from './Components/Admin/Layouts/Sidebar';

import "./Components/Admin/assets/css/style.css";
import "./Components/Admin/assets/vendor/bootstrap/css/bootstrap.min.css";
import "./Components/Admin/assets/vendor/bootstrap-icons/bootstrap-icons.css";
import "./Components/Admin/assets/vendor/quill/quill.snow.css";
import "./Components/Admin/assets/vendor/quill/quill.bubble.css";
import "./Components/Admin/assets/vendor/remixicon/remixicon.css";
import "./Components/Admin/assets/vendor/simple-datatables/style.css";




const InnerContent = () => {
  return <div className='inner-content'>
    <AdminNavbar></AdminNavbar>
    <AdminSidebar></AdminSidebar>
    <main id="main" class="main">
    <Outlet/>
    </main>
    <AdminFooter></AdminFooter>
    
  </div>
}

export default InnerContent;