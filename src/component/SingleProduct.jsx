import { Rate } from "antd";
import { Link } from "react-router-dom";
import { Context } from "../../Provider/Context";
import { useContext } from "react";

const SingleProduct = ({ selCategory }) => {
  const { addToCart } = useContext(Context);

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
