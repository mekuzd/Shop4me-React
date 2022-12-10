import React from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import { useContext } from "react";
import { Context } from "../../Provider/Context";
import Footer from "../component/Footer";
import { useEffect, useRef } from "react";

const Signup = () => {
  const { Theme } = useContext(Context);

  const firstname = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    firstname.current.focus();
  }, []);

  return (
    <DefaultLayout>
      <main className={`bg-${Theme}`}>
        <div className=" text-center py-5 ">
          <h1 className="fs-1 fw-bold text-secondary">Create an Account</h1>

          <div className="form ">
            <form
              action=""
              onSubmit={handleSubmit}
              className={`form-control bg-${Theme} shadow p-3`}
            >
              <div>
                <label htmlFor="firstname">First Name</label>
                <input
                  ref={firstname}
                  type="text"
                  id="firstname"
                  className="form-control"
                />
              </div>
              <br />
              <div>
                <label htmlFor="lastname">Last Name</label>
                <input type="text" id="lastname" className="form-control" />
              </div>
              <br />
              <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" className="form-control" />
              </div>{" "}
              <br />
              <div>
                <label htmlFor="password">Password</label>
                <input type="text" id="password" className="form-control" />
              </div>
              <button
                type="button"
                className="btn btn-outline-warning w-25 my-4"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </main>
      <footer>{<Footer />}</footer>
    </DefaultLayout>
  );
};
export default Signup;
