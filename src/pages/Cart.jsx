import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout";
import { useContext } from "react";
import { Context } from "../../Provider/Context";
import { AiFillDelete } from "react-icons/ai";
import Alert from "../component/Alert";
import Footer from "../component/Footer";

const Cart = () => {
  const { Cart, setCart, alert, setalert, alertMessage, setalertMessage } =
    useContext(Context);

  const [Total, setTotal] = useState(0);

  const totalSum = Cart.map((item) => {
    return item.Total;
  }).reduce((Total, value) => {
    return Math.round((Total + value) * 100) / 100;
  }, 0);

  useEffect(() => {
    setTotal(totalSum);
  }, [totalSum]);

  const ClearCart = () => {
    setCart([]);
    localStorage.removeItem("cartItem");
  };

  const RemoveCartItem = (id) => {
    let NewItem = Cart.filter((item) => item.id !== id);
    setCart(NewItem);
    setalertMessage("ITEM REMOVED");
    setalert(true);
    localStorage.setItem("cartItem", JSON.stringify(NewItem));
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
    localStorage.setItem("cartItem", JSON.stringify(NewCart));
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
      localStorage.setItem("cartItem", JSON.stringify(NewCart));
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
          <h1 className="fs-1 fw-bold text-center"> Your Cart is Empty </h1>
          <div className=" text-center">
            <Link
              to={"/products"}
              className=" btn btn-outline-warning my-2  "
              style={{ width: "100px" }}
            >
              Fill It
            </Link>
          </div>
        </main>
      </DefaultLayout>
    );
  }

  // if cart is filled
  return (
    <>
      <DefaultLayout>
        {Cart.length > 0 && (
          <main>
            {/* main body */}
            <div className={`    border-0 card-body    cartbody `}>
              <div className="text-center ">
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
              {Cart.map((item) => (
                <div
                  key={item?.id}
                  className={`my-4  row  card-body  p-4  shadow border d-flex flex-wrap`}
                >
                  <div className="  col-sm-5 ">
                    <img
                      src={item?.image}
                      style={{ width: "100px", margin: "auto" }}
                      alt=""
                    />
                    <h1
                      className="fw-bold fs-4 mt-5  text-center"
                      style={{ width: "fit-Content" }}
                    >
                      {" "}
                      {item.title}
                    </h1>
                  </div>{" "}
                  <div className="col-sm-7 text-center  mt-2">
                    <div>
                      <span className="fw-bold fs-5">price :</span> <br />
                      <span className="my-4 fs-4 fw-bold"> ${item?.price}</span>
                      <br />
                    </div>
                    <div className="mt-3">
                      <button
                        className=" fs-3"
                        onClick={() =>
                          decreaseCartQuantity(item?.id, item?.Quantity)
                        }
                      >
                        -
                      </button>
                      <span className="mx-3 fw-bold fs-4 ">
                        {item.Quantity}
                      </span>
                      <button
                        className=" fs-4"
                        onClick={() => increaseCartQuantity(item?.id)}
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                    <div className="mt-4 ">
                      <h5 className="fs-4 fw-bold ">Total: ${item.Total} </h5>

                      <AiFillDelete
                        onClick={() => RemoveCartItem(item.id)}
                        className="fs-2 text-danger ms-auto"
                      />
                    </div>
                  </div>
                </div>
              ))}

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
      </DefaultLayout>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
export default Cart;
