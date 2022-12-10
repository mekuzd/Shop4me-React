import { useContext, useState } from "react";
import { useEffect } from "react";

import { Rate } from "antd";
import { Link } from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout";
import { Context } from "../../Provider/Context";
import http from "../config/http";
import Footer from "../component/Footer";
// import { Modal } from "antd";

const Products = () => {
  let [category, setcategory] = useState("");
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [selCategory, setSelcategory] = useState([]);
  const { Theme, addToCart } = useContext(Context);

  //  addtocart function

  const categoryBtn = (category) => {
    setcategory(category);
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
          <div
            className="text-warning spinner-border"
            style={{ width: "100px", height: "100px" }}
          ></div>
        </div>
      </DefaultLayout>
    );
  }

  return (
    <main>
      <DefaultLayout>
        {!loading && products.length > 0 && (
          <main>
            <h2 className="text-center text-secondary fw-bold fs-3 my-2">
              Store Products
            </h2>
            <div className="underline"></div>

            {/* category buttons   */}

            <div className=" Categorybtn my-2">
              <button
                className="btn btn-outline-warning mx-2"
                onClick={(e) => categoryBtn(e.target.dataset.id)}
                data-id="All"
              >
                All
              </button>
              <button
                className="btn btn-outline-warning mx-2"
                onClick={(e) => categoryBtn(e.target.dataset.id)}
                data-id="electronics"
              >
                electronics
              </button>
              <button
                className="btn btn-outline-warning mx-2"
                onClick={(e) => categoryBtn(e.target.dataset.id)}
                data-id="jewelery"
              >
                jewelery
              </button>
              <button
                className="btn btn-outline-warning mx-2"
                onClick={(e) => categoryBtn(e.target.dataset.id)}
                data-id="men's clothing"
              >
                men's clothing
              </button>
              <button
                className="btn btn-outline-warning mx-2"
                onClick={(e) => categoryBtn(e.target.dataset.id)}
                data-id="women's clothing"
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
            <Footer />
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

/*if a modal display was to be used to view products of each item */

// const [isModalOpen, setIsModalOpen] = useState(false);
// const [data, setdata] = useState({});

// const showModal = (item) => {
//   setIsModalOpen(true);
//   setdata(item);
// };
/* <Modal
        // title="Basic Modal"
        footer={null}
        open={isModalOpen}
        onOk={handleOk}
        data={data}
        onCancel={handleCancel}
      >
        <p>{data.title}</p>
        <div style={{ width: "200px" }}>
          <img src={data.image} alt="" style={{ width: "100%" }} />
        </div>
        <button
          className="btn btn-warning my-2 mx-auto "
          onClick={() => addToCart(data)}
        >
          Add to Cart
        </button>
      </Modal> */
