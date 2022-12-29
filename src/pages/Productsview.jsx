import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Rate } from "antd";
import DefaultLayout from "../Layouts/DefaultLayout";
import { useContext } from "react";
import { Context } from "../../Provider/Context";
import { Skeleton } from "antd";
import http from "../config/http";
import Footer from "../component/Footer";
import Alert from "../component/Alert";

const Productsview = () => {
  const { alert, alertMessage, addToCart, setalert } = useContext(Context);
  const { id } = useParams();
  const [item, setitem] = useState({});
  const [loading, setloading] = useState(true);
  const [readmore, setreadmore] = useState(false);
  let isMounted = true;

  const closeAlert = () => {
    setalert(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await http.get(`/products/${id}`);
        setitem(response.data);
        setloading(false);
      } catch (error) {
        console.log("error");
      }
    };
    if (isMounted) {
      fetchProduct();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <DefaultLayout>
        <main>
          <Skeleton active />
        </main>
      </DefaultLayout>
    );
  }

  return (
    <>
      <DefaultLayout>
        {!loading && (
          <main className="">
            <Link
              to={"/products"}
              className=" btn btn-secondary m-2  "
              style={{ width: "200px" }}
            >
              BACK TO PRODUCTS
            </Link>
            {alert && (
              <Alert closeAlert={closeAlert} alertMessage={alertMessage} />
            )}
            <main className="product-view row justify-content-center my-4 p-3">
              <div className="col-sm-4 animate__animated animate__backInLeft">
                <img src={item?.image} alt={item?.title} />
              </div>

              <div
                className={`card p-3 shadow-lg border col-sm-4 animate__animated animate__backInRight`}
                style={{ backgroundColor: "transparent" }}
              >
                <h1 className="fw-bold">{item?.title}</h1>
                <p className="my-4 fs-5 readmore">
                  {readmore
                    ? item?.description
                    : `${item.description.substring(0, 60)}...`}
                  <button
                    className="fs-6 "
                    onClick={() => setreadmore(!readmore)}
                  >
                    {readmore ? "Read less" : "Read more"}
                  </button>
                </p>
                <div className="">
                  <div className="fs-5">
                    Rating:
                    <Rate disabled value={item?.rating?.rate} />
                  </div>
                  <p>
                    <span className="fw-bold">Category :</span>
                    {String(item?.category).toLocaleUpperCase()}
                  </p>
                </div>
                <Link
                  className="btn btn-outline-warning w-25 ms-auto mt-auto"
                  onClick={() => addToCart(item)}
                >
                  Add to cart
                </Link>
              </div>
            </main>
            <footer>
              <Footer />
            </footer>
          </main>
        )}
      </DefaultLayout>
    </>
  );
};
export default Productsview;
