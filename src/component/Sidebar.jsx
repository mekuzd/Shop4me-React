import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
const Sidebar = ({ show, handleClose }) => {
  return (
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
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default Sidebar;
