import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useContext, useState } from "react";
import { Context } from "../../Provider/Context";
import { Switch } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";
import Offcanvas from "react-bootstrap/Offcanvas";

const Navbar = () => {
  const { Theme, setTheme, Cart } = useContext(Context);
  const [show, setShow] = useState(false);
  const [drop, setdrop] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function changeTheme() {
    setTheme((prev) => (prev == "light" ? "dark" : "light"));
    Theme == "light"
      ? (document.body.className = "bg-dark text-white")
      : (document.body.className = "bg-light text-dark");
  }

  return (
    <nav
      className={`d-flex  d-sm-flex shadow justify-content-around align-items-center   bg-${Theme} p-3  fixed-top`}
    >
      <Link to={"/"} className="text-warning fs-1 ">
        Shop4me
      </Link>

      <div className="d-block d-md-none ms-auto bar">
        <FaBars className="text-warning fs-2 " onClick={handleShow} />
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          {" "}
          <Link to={"/"} className="fs-3 fw-bold text-warning">
            Shop4me
          </Link>{" "}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className=" d-flex flex-column justify-content-end gap-3 align-items-center ">
            <Link to={"/products"} className="text-warning ms-2 fs-5">
              Products
            </Link>

            <Link to={"/signup"} className="text-warning fs-5">
              SignUp
            </Link>

            <Link to={"/login"} className="ms-2 text-warning fs-5">
              Login
            </Link>

            <div>
              <Link to={"/cart"} className="text-warning ">
                <button className="btn btn-secondary">
                  Cart
                  <span className="badge bg-light text-warning">
                    {Cart.length}
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

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
            <span className="position-absolute ">{Cart.length}</span>
          </Link>
        </div>
        <div>
          <button className={`bg-${Theme} border-0 ms-4 text-warning`}>
            {Theme == "light" ? "Dark" : "light"}
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
