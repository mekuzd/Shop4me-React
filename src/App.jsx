import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Provider/Context";
import DefaultLayout from "./Layouts/DefaultLayout";

import Footer from "./component/Footer";

function App() {
  const { Theme } = useContext(Context);

  return (
    <>
      <DefaultLayout>
        {/* top  */}
        <main className="container-fluid">
          <main
            className="row justify-content-center p-2 "
            style={{ marginTop: "120px" }}
          >
            <div className="col-sm-5">
              <h1 className="fs-1 fw-bold text-secondary">
                Shop for Your Item
              </h1>
              <p className="my-5 fs-4 fw-1">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
                at sed omnis corporis doloremque possimus velit! Repudiandae
                nisi odit, aperiam odio ducimus, obcaecati libero et quia
                tempora excepturi quis alias?
              </p>
              <Link
                to={"/products"}
                className="btn btn-warning p-2 my-5 w-25 fs-5 fw-bold rounded"
              >
                Shop Now
              </Link>
            </div>
            <div className="col-sm-5 m-3">
              <img
                src="../src/assets/Homepage.jpg"
                alt=""
                className="Homepage-img"
              />
            </div>
          </main>
          {/* middle */}
          <section className={`section bg-${Theme} `}>
            <main className="row justify-content-center middle-section align-items-center">
              <div className="col-sm-4 m-3">
                <h1 className="fs-2 fw-bold p-2  ">
                  Custom Made Dresses Only For You
                </h1>
              </div>
              <div className="col-sm-5 mx-5">
                <p className="fs-5  ">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Inventore dolore possimus perspiciatis sunt! Mollitia, porro.
                  Animi sequi, assumenda dicta laborum expedita, quas vero quae
                  fugit cumque dolore modi soluta ullam. Esse ullam a fugiat
                </p>
              </div>
            </main>
            {/* mission vision history */}
            <main className="row justify-content-center gap-5 mission">
              <div className="col-sm-3 shadow homecard p-5">
                <h1 className="text-center  fs-3">MISSION</h1>
                <p className="my-5">
                  {" "}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Commodi, tenetur cumque odit accusamus ea, sapiente velit
                  molestias ad labore deleniti saepe recusandae illum fugiat
                  repellat excepturi alias. Magni, repellat repudiandae!
                </p>
              </div>
              <div className="col-sm-3 shadow homecard p-5">
                <h1 className="text-center fs-3">VISION</h1>
                <p className="my-5">
                  {" "}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Commodi, tenetur cumque odit accusamus ea, sapiente velit
                  molestias ad labore deleniti saepe recusandae illum fugiat
                  repellat excepturi alias. Magni, repellat repudiandae!
                </p>
              </div>
              <div className="col-sm-3 shadow homecard p-5">
                <h1 className="text-center fs-3">HISTORY</h1>
                <p className="my-5">
                  {" "}
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Commodi, tenetur cumque odit accusamus ea, sapiente velit
                  molestias ad labore deleniti saepe recusandae illum fugiat
                  repellat excepturi alias. Magni, repellat repudiandae!
                </p>
              </div>
            </main>
          </section>
        </main>
      </DefaultLayout>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
export default App;
