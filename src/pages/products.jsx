import { useContext, useState } from "react";
import { useEffect } from "react";

import { Rate } from "antd";
import { Link } from "react-router-dom";
import DefaultLayout from "../Layouts/DefaultLayout";
import { Context } from "../../Provider/Context";
import http from "../config/http";
import Footer from "../component/Footer";
import Alert from "../component/Alert";

const Products = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [selCategory, setSelcategory] = useState([]);
  const { alert, alertMessage, setalertMessage, setalert, Cart, setCart } =
    useContext(Context);
  const [activeCategory, setactiveCatgory] = useState("All");
  const [category, setcategory] = useState([]);

  const categoryBtn = (category) => {
    setactiveCatgory(category);
    const Menucategory = products.filter(
      (product) => product.category === category,
    );
    if (category == "All") {
      setSelcategory(products);
    } else {
      setSelcategory(Menucategory);
    }
  };
  const closeAlert = () => {
    setalert(false);
  };

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

  let isMounted = true;
  //fetch products
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

  //fetch categories
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await http.get("/products/categories");
        setcategory(response.data);
      } catch (error) {
        console.log("error");
        setcategory([]);
      }
    };
    if (isMounted) {
      fetchCategory();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // added All to categories
  let newCategory = ["All", ...category];

  if (loading) {
    return (
      <DefaultLayout>
        <div className="loading">
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
            {alert && (
              <Alert closeAlert={closeAlert} alertMessage={alertMessage} />
            )}{" "}
            <h2 className="text-center text-secondary fw-bold fs-3 m-2">
              Store Products
            </h2>
            <div className="underline "></div>
            {/* displaycategory buttons   */}
            <div className=" Categorybtn my-4">
              {newCategory.map((category, index) => (
                <button
                  key={index}
                  className={`  m-2 ${
                    category == activeCategory && "active-btn"
                  }`}
                  onClick={() => categoryBtn(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* display products */}
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
