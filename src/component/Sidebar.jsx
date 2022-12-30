import Offcanvas from "react-bootstrap/Offcanvas";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Switch } from "@chakra-ui/react";

const Sidebar = ({ show, handleClose }) => {
  const [theme, settheme] = useState(false);
  function changeTheme() {
    settheme(!theme);
    document.body.classList.toggle("dark-mode");
  }
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      className={`offcanvas   ${
        show
          ? "animate__animated animate__slideInDown "
          : "animate__animated animate__slideOutUp"
      } `}
    >
      <Offcanvas.Header closeButton className="offcanvas-header">
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
            <button className={` fs-4 text-warning`}>
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
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default Sidebar;
