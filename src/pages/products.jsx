import { useContext, useState } from "react";
import { useEffect } from "react";

import { Rate } from "antd";
import { Link } from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout";
import { Context } from "../../Provider/Context";
import http from "../config/http";
import Footer from "../component/Footer";

const Products = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [selCategory, setSelcategory] = useState([]);
  const { Theme, addToCart } = useContext(Context);

  const categoryBtn = (category) => {
    const Menucategory = products.filter(
      (product) => product.category === category,
    );
    if (category == "All") {
      setSelcategory(products);
    } else {
      setSelcategory(Menucategory);
    }
  };

  let isMounted = true;
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await http.get("/products");
        setproducts(response.data);
        setSelcategory(response.data);
        setloading(false);
      } catch (error) {
        console.log("error");
        setSelcategory([]);
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
        <div
          className=" d-flex justify-content-center"
          style={{ marginTop: "70px" }}
        >
          <div className="text-warning spinner-border"></div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <main>
      <DefaultLayout>
        {!loading && products.length > 0 && (
          <main>
            <h2 className="text-center text-secondary fw-bold fs-3 m-2">
              Store Products
            </h2>
            <div className="underline "></div>
            {/* category buttons   */}
            <div className=" Categorybtn my-4">
              <button
                className="btn btn-outline-warning mx-2"
                onClick={() => categoryBtn("All")}
              >
                All
              </button>
              <button
                className="btn btn-outline-warning mx-2"
                onClick={() => categoryBtn("electronics")}
              >
                electronics
              </button>
              <button
                className="btn btn-outline-warning mx-2"
                onClick={() => categoryBtn("jewelery")}
              >
                jewelery
              </button>
              <button
                className="btn btn-outline-warning mx-2"
                onClick={() => categoryBtn(`men's clothing`)}
              >
                men's clothing
              </button>
              <button
                className="btn btn-outline-warning mx-2"
                onClick={() => categoryBtn(`women's clothing`)}
              >
                women's clothing
              </button>
            </div>
            {/* display products */}
            <div className="products">
              {selCategory.map((item) => (
                <div
                  key={item.id}
                  className={`card card-body product  bg-${Theme} `}
                >
                  <div className="text-center">
                    <img src={item?.image} alt="" className={"productImg"} />
                  </div>
                  <h4 className={`fw-bold bg-${Theme} mt-5`}>{item?.title}</h4>
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
                        to={"/cart"}
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
            <footer>
              <Footer />
            </footer>{" "}
          </main>
        )}
      </DefaultLayout>
      {!loading && products.length == 0 && (
        <DefaultLayout>
          <div className="alert alert-warning">
            <h2>no store product found</h2>
          </div>
        </DefaultLayout>
      )}
    </main>
  );
};
export default Products;
