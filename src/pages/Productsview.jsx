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

const Productsview = () => {
  const { Theme, addToCart } = useContext(Context);
  const { id } = useParams();
  const [item, setitem] = useState({});
  const [loading, setloading] = useState(true);
  const [readmore, setreadmore] = useState(false);
  let isMounted = true;

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
          <Skeleton active square />
        </main>
      </DefaultLayout>
    );
  }

  return (
    <>
      <DefaultLayout>
        {!loading && (
          <main className="container-fluid">
            <Link
              to={"/products"}
              className=" btn btn-secondary   "
              style={{ width: "200px", marginLeft: "210px" }}
            >
              BACK TO PRODUCTS
            </Link>
            <main className="product-view row justify-content-center my-4 p-3">
              <div className="col-sm-4">
                <img src={item?.image} alt={item?.title} />
              </div>

              <div
                className={`card bg-${Theme}  p-3 shadow border-0  col-sm-4 `}
              >
                <h1 className="fw-bold">{item?.title}</h1>
                <p className="my-4 fs-5x">
                  {readmore
                    ? item?.description
                    : `${item.description.substring(0, 60)}...`}
                  <button onClick={() => setreadmore(!readmore)}>
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
                  to={"/cart"}
                  className="btn btn-outline-warning w-25 ms-auto mt-auto"
                  onClick={() => addToCart(item)}
                >
                  Add to cart
                </Link>
              </div>
            </main>
            <Footer />
          </main>
        )}
      </DefaultLayout>
    </>
  );
};
export default Productsview;
