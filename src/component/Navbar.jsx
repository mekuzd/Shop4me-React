import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { Context } from "../../Provider/Context";
import { Switch } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
// import Offcanvas from "react-bootstrap/Offcanvas";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { Cart } = useContext(Context);

  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [theme, settheme] = useState(false);

  function changeTheme() {
    settheme(!theme);
    document.body.classList.toggle("dark-mode");
  }

  return (
    <nav
      className={`d-flex  d-sm-flex shadow justify-content-around align-items-center     p-3  fixed-top`}
    >
      {/* mobile navbar  */}
      <Link to={"/"} className="text-warning fs-1 ">
        Shop4me
      </Link>

      <div className="d-block d-md-none ms-auto">
        <Link to={"/cart"} className="text-warning   position-relative ">
          <ShoppingCartOutlined style={{ fontSize: "40px" }} />
          {Cart.length > 0 && (
            <span className="position-absolute ">{Cart.length}</span>
          )}
        </Link>
      </div>
      <div className="d-block d-md-none ms-auto bar">
        <FaBars className="text-warning fs-2 " onClick={handleShow} />
      </div>

      {/* toggle side bar  */}
      <Sidebar show={show} handleClose={handleClose} />

      {/* nav links on desktop */}
      <div className="d-none d-md-flex justify-content-between align-items-center nav-page">
        <Link to={"/products"} className="text-warning ms-2 fs-5">
          Products
        </Link>
        <Link to={"/signup"} className="text-warning fs-5">
          SignUp
        </Link>

        <Link to={"/login"} className="ms-2 text-warning fs-5">
          Login
        </Link>
      </div>

      <div
        className="d-none d-md-flex justify-content-center align-items-center"
        style={{ width: "200px" }}
      >
        <div>
          <Link to={"/cart"} className="text-warning   position-relative ">
            <ShoppingCartOutlined style={{ fontSize: "40px" }} />
            {Cart.length > 0 && (
              <span className="position-absolute ">{Cart.length}</span>
            )}
          </Link>
        </div>
        <div>
          <button className={` border-0 ms-4 text-warning`}>
            {theme ? "light" : "dark"}
          </button>
          <Switch
            size="md"
            onChange={changeTheme}
            colorScheme="yellow"
            style={{ marginLeft: "10px" }}
          />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
