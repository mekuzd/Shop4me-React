import { Rate } from "antd";
import { Link } from "react-router-dom";
import { Context } from "../../Provider/Context";
import { useContext } from "react";

const SingleProduct = ({ selCategory }) => {
  const { setalertMessage, setalert, Cart, setCart } = useContext(Context);

  const addToCart = (item) => {
    let itemExist = false;
    if (Cart) {
      Cart.map((existinItem) => {
        if (existinItem.id == item.id) {
          itemExist = true;
        }
      });
    }
    if (itemExist) {
      let prevCartitem = Cart.map((previtem) => {
        if (previtem.id == item.id) {
          return {
            ...previtem,
            Quantity: (previtem.Quantity += 1),
            Total: Math.round(previtem.price * previtem.Quantity * 100) / 100,
          };
        } else {
          return previtem;
        }
      });
      setCart(prevCartitem);
      localStorage.setItem("cartItem", JSON.stringify(prevCartitem));
      setalertMessage("ITEM ALREADY ADDED TO CART HENCE QUANTITY INCREASED");
      setalert(true);
    } else {
      let newCart = [...Cart, { ...item, Quantity: 1, Total: item.price }];
      setCart(newCart);
      localStorage.setItem("cartItem", JSON.stringify(newCart));
      setalertMessage("ITEM ADDED TO CART");
      setalert(true);
    }
  };

  return (
    <div className="products">
      {selCategory.map((item) => (
        <div key={item.id} className={`card card-body product  `}>
          <div className="text-center">
            <img src={item?.image} alt="" className={"productImg"} />
          </div>
          <h4 className={`fw-bold  mt-5`}>{item?.title}</h4>
          <div className="mt-auto">
            <div>
              <span>rating:</span>
              <Rate disabled value={item?.rating?.rate} />
            </div>
            <div className="d-flex my-4 justify-content-start">
              <Link
                to={`/products/ ${item.id}`}
                className="btn btn-outline-warning"
              >
                View Product
              </Link>
              <Link
                className="btn btn-outline-warning mx-4"
                onClick={() => addToCart(item)}
              >
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SingleProduct;
