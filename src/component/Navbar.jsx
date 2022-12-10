import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { Context } from "../../Provider/Context";
import { Switch } from "@chakra-ui/react";

const Navbar = () => {
  const { Theme, setTheme, Cart } = useContext(Context);

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

      <div className="d-none d-sm-flex justify-content-between align-items-center nav-page">
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
        className="d-flex justify-content-between align-items-center"
        style={{ width: "200px" }}
      >
        <Link to={"/cart"} className="text-warning   position-relative ">
          <ShoppingCartOutlined style={{ fontSize: "40px" }} />
          <span className="position-absolute top-0 start-100">
            {Cart.length}
          </span>
        </Link>
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
