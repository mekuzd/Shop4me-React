import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout";
import { useContext } from "react";
import { Context } from "../../Provider/Context";
import { AiFillDelete } from "react-icons/ai";
import Alert from "../component/Alert";

const Cart = () => {
  const {
    Theme,
    Cart,
    setCart,
    alert,
    setalert,
    alertMessage,
    setalertMessage,
  } = useContext(Context);

  const [Total, setTotal] = useState(0);

  const subTotal = Cart.map((item) => {
    return item.Total;
  });

  const totalSum = subTotal.reduce((Total, value) => {
    return Math.round((Total + value) * 100) / 100;
  }, 0);

  useEffect(() => {
    setTotal(totalSum);
  }, [totalSum]);

  const ClearCart = () => {
    setCart([]);
    localStorage.clear();
  };

  const RemoveCartItem = (id) => {
    let NewItem = Cart.filter((item) => item.id !== id);
    setCart(NewItem);
    setalertMessage("ITEM REMOVED");
    setalert(true);

    localStorage.setItem("cartItem", JSON.stringify(Cart));
  };

  const increaseCartQuantity = (id) => {
    let NewCart = Cart.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          Quantity: (item.Quantity += 1),
          Total: Math.round(item.price * item.Quantity * 100) / 100,
        };
      } else {
        return item;
      }
    });
    setCart(NewCart);
    localStorage.setItem("cartItem", JSON.stringify(Cart));
  };

  const decreaseCartQuantity = (id, quantity) => {
    if (quantity > 1) {
      let NewCart = Cart.map((item) => {
        if (item.id == id) {
          return {
            ...item,
            Quantity: (item.Quantity -= 1),
            Total: Math.round(item.price * item.Quantity * 100) / 100,
          };
        } else {
          return item;
        }
      });
      setCart(NewCart);
      localStorage.setItem("cartItem", JSON.stringify(Cart));
    }
  };

  const closeAlert = () => {
    setalert(false);
  };
  // if cart is empty
  if (Cart.length == 0) {
    return (
      <DefaultLayout>
        <main style={{ marginTop: "200px" }}>
          <main style={{ width: "500px", margin: "auto" }}>
            <h1 className="fs-1 fw-bold"> Your Cart is Empty </h1>
            <div className=" m-auto" style={{ width: "300px" }}>
              <Link
                to={"/products"}
                className=" btn btn-outline-warning my-2  "
                style={{ width: "100px" }}
              >
                Fill It
              </Link>
            </div>
          </main>
        </main>
      </DefaultLayout>
    );
  }

  // if cart is filled
  return (
    <DefaultLayout>
      <main className="container-fluid">
        {Cart.length > 0 && (
          <main>
            {/* main body */}
            <div className={` bg-${Theme}  card-body cart-body `}>
              <div className="text-center">
                {alert && (
                  <Alert closeAlert={closeAlert} alertMessage={alertMessage} />
                )}{" "}
              </div>
              <div className="d-flex justify-content-between">
                <div>
                  {" "}
                  <Link
                    to={"/products"}
                    className="btn btn-outline-warning mb-2"
                  >
                    {" "}
                    Continue Shopping
                  </Link>
                </div>
                <div>
                  {" "}
                  <button
                    className="btn btn-outline-warning"
                    onClick={ClearCart}
                  >
                    {" "}
                    Clear Cart{" "}
                  </button>
                </div>
              </div>
              {/* Table  */}
              <table
                className={`table table-borderless border  table-${Theme}  mt-5`}
              >
                <thead className="text-warning ">
                  <tr scope="row">
                    <th scope="col">item</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {Cart.map((item) => (
                    <tr key={item.id} className="cartItem" style={{}}>
                      {/* item and title */}
                      <td scope="col">
                        <span className="">
                          <span>
                            <img src={item?.image} alt={item?.title} />
                          </span>

                          <p className="fw-bold ">{item?.title}</p>
                        </span>
                      </td>
                      {/* item price  */}
                      <td scope="col" className="fs-5">
                        <span>$</span>
                        {item?.price}
                      </td>

                      {/* increase and decrease btn */}
                      <td scope="col">
                        {" "}
                        <span
                          className="d-flex justify-content-between "
                          style={{ width: "50px" }}
                        >
                          <button
                            className="fw-bold fs-4 "
                            onClick={() =>
                              decreaseCartQuantity(item.id, item?.Quantity)
                            }
                          >
                            -
                          </button>
                          <p className=" ms-2 fs-4 fw-bold">{item?.Quantity}</p>
                          <button
                            className="fs-4 fw-bold"
                            onClick={() => increaseCartQuantity(item?.id)}
                          >
                            +
                          </button>
                        </span>
                      </td>
                      {/* total  */}
                      <td className="fs-5" scope="col">
                        <span>$</span>
                        {item?.Total}
                      </td>
                      {/* button remove  */}
                      <td scope="col">
                        <AiFillDelete
                          onClick={() => RemoveCartItem(item.id)}
                          style={{
                            fontSize: "25px",
                            color: "red",
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="  total border ">
                <h1 className="fs-4 fw-bold ">
                  order Total: <span className="ms-4">${Total}</span>
                </h1>
                <Link
                  to={"/login"}
                  className="btn w-100 btn-outline-warning  my-2 fw-bold"
                >
                  LOGIN
                </Link>
              </div>
            </div>
          </main>
        )}
      </main>
    </DefaultLayout>
  );
};
export default Cart;
