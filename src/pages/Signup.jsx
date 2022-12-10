import React from "react";
import DefaultLayout from "../Layouts/DefaultLayout";
import { useContext } from "react";
import { Context } from "../../Provider/Context";
import Footer from "../component/Footer";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Alert from "../component/Alert";

const Signup = () => {
  const state = useRef({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [Store, setStore] = useState([]);

  const { Theme, alert, setalert, alertMessage, setalertMessage } =
    useContext(Context);

  const firstname = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !state.current.email &&
      !state.current.firstname &&
      !state.current.lastname &&
      !state.current.password
    ) {
      setalert(true);
      setalertMessage("input field not filled");
    } else if (
      !state.current.email.includes("@") &&
      state.current.firstname &&
      state.current.lastname &&
      state.current.password
    ) {
      setalert(true);
      setalertMessage("include @ in email");
    } else if (
      state.current.email.includes("@") &&
      state.current.firstname &&
      state.current.lastname &&
      state.current.password.length < 8
    ) {
      setalert(true);
      setalertMessage("password length at least 8 characters");
    } else {
      setalert(true);

      setalertMessage("Registered Succesfully");
      let newStore = [...Store, { ...state.current }];
      setStore(newStore);
    }
  };

  console.log(state.current, Store);

  useEffect(() => {
    firstname.current.focus();
  }, []);

  const closeAlert = () => {
    setalert(false);
  };

  return (
    <DefaultLayout>
      <main className={`bg-${Theme}`}>
        <div className=" text-center py-5 ">
          {alert && (
            <Alert closeAlert={closeAlert} alertMessage={alertMessage} />
          )}
          <h1 className="fs-1 fw-bold text-warning">Create an Account</h1>

          {/* form  */}
          <div className="form ">
            <form
              action=""
              onSubmit={handleSubmit}
              className={`form-control bg-${Theme} shadow p-3`}
            >
              {/* First NAme  */}
              <div>
                <label htmlFor="firstname">First Name</label>
                <input
                  ref={firstname}
                  onChange={(e) => (state.current.firstname = e.target.value)}
                  type="text"
                  id="firstname"
                  className="form-control"
                />
              </div>
              <br />
              {/* LastName  */}
              <div>
                <label htmlFor="lastname">Last Name</label>
                <input
                  onChange={(e) => (state.current.lastname = e.target.value)}
                  type="text"
                  id="lastname"
                  className="form-control"
                />
              </div>
              <br />
              {/* Email  */}
              <div>
                <label htmlFor="email">Email</label>
                <input
                  onChange={(e) => (state.current.email = e.target.value)}
                  type="text"
                  id="email"
                  className="form-control"
                />
              </div>{" "}
              <br />
              {/* password  */}
              <div>
                <label htmlFor="password">Password</label>
                <input
                  onChange={(e) => (state.current.password = e.target.value)}
                  type="password"
                  id="password"
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-warning fs-5 w-25 my-4"
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
