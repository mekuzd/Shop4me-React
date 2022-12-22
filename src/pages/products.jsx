import { useContext, useState } from "react";
import { useEffect } from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import { Context } from "../../Provider/Context";
import http from "../config/http";
import Footer from "../component/Footer";
import Alert from "../component/Alert";
import SingleProduct from "../component/SingleProduct";

const Products = () => {
  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [selCategory, setSelcategory] = useState([]);
  const { alert, alertMessage, setalert } = useContext(Context);
  const [activeCategory, setactiveCategory] = useState("All");
  const [category, setcategory] = useState([]);
  const [searchCategory, setsearchCategory] = useState("");
  const [notequalCat, setnotEqualCat] = useState(false);

  // handle category btn
  const categoryBtn = (category) => {
    setnotEqualCat(false);
    setactiveCategory(category);
    const Menucategory = products.filter(
      (product) => product.category === category,
    );
    if (category == "All") {
      setSelcategory(products);
    } else {
      setSelcategory(Menucategory);
    }
  };

  // handle search input
  let equalCategory = false;
  const handleSubmit = (e) => {
    e.preventDefault();

    newCategory.find((category) => {
      if (category == searchCategory) {
        equalCategory = true;
      }
    });

    if (equalCategory) {
      categoryBtn(searchCategory);
    } else {
      setnotEqualCat(true);
    }
  };

  const closeAlert = () => {
    setalert(false);
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
            {/* input searvh categories  */}
            <form
              action=""
              className="border-0 my-3 form-control"
              onSubmit={handleSubmit}
            >
              <div className="d-flex m-auto px-2 searchInp  ">
                <input
                  type="text"
                  placeholder="Search Categories e.g All"
                  className="form-control"
                  onChange={(e) => setsearchCategory(e.target.value)}
                />{" "}
                <button type="submit" className="btn btn-outline-warning mx-2 ">
                  Search
                </button>
              </div>
            </form>
            {/* displaycategory buttons   */}
            <div className=" Categorybtn my-4">
              {newCategory.map((category, index) => (
                <button
                  key={index}
                  className={` m-2 ${
                    category == activeCategory && "active-btn"
                  }`}
                  onClick={() => categoryBtn(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            {/* display products */}
            {notequalCat ? (
              <h1 className="fs-3 text-secondary text-center">
                category not found
              </h1>
            ) : (
              <SingleProduct selCategory={selCategory} />
            )}
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
